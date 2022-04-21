import express from 'express'
import AntSim from '../models/ant-sim'
import Backup from '../models/backup'

const oneDay = 1000 * 60 * 60 * 24

const TICK = 150

const TableRouter = express.Router()
const listeners = []

// find latest backup
Backup.findOne({}, {}, { sort: { date: -1 } }, (err, data) => {
  if (err) {
    console.log('Unable to load backup!')
  }

  console.log(`Loaded backup from ${data.date.toLocaleString()}`)
  const antSim = new AntSim(JSON.parse(data.backup))
  // const antSim = new AntSim()

  const backupSim = async () => {
    const currentTime = new Date()
    const backup = JSON.stringify(antSim.toExport())
    const backupDoc = new Backup({ date: currentTime, backup })
    await backupDoc.save()
    console.log('Saved backup!')

    // delete old backups
    const tenDaysBack = new Date()
    tenDaysBack.setDate(currentTime.getDate() - 10)
    const oldBackups = Backup.find({ date: { $lte: tenDaysBack } })
    if ((await oldBackups.count()) !== 0) {
      await oldBackups.deleteMany({})
      console.log('Deleted old backups.')
    }
    setTimeout(backupSim, oneDay * 0.5)
  }

  // wait 15 minutes then backup
  setTimeout(backupSim, 1000 * 60 * 15)

  process.on('exit', backupSim)

  setInterval(() => {
    antSim.update(TICK)
    const liveData = antSim.toLive()
    const antsData = JSON.stringify(liveData)
    listeners.forEach((listener) => {
      listener(antsData)
    })
  }, TICK)

  TableRouter.ws('/', (ws) => {
    // console.log('table connection opened!')

    const listener = (data) => ws.send(data)
    listeners.push(listener)

    ws.on('close', () => {
      // console.log('table connection closed!')
      listeners.splice(listeners.indexOf(listener), 1)
    })
  })

  TableRouter.get('/dead', (req, res, next) => {
    res.status(200).json({ deadAnts: antSim.state.deadAnts })
  })
})

export default TableRouter
