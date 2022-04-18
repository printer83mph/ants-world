import express from 'express'
import AntSim from '../models/ant-sim'
import Backup from '../models/backup'

const oneDay = 1000 * 60 * 60 * 24

const TICK = 150

const TableRouter = express.Router()
const listeners = []

let antSim

Backup.findOne({}, {}, { sort: { date: -1 } }, (err, data) => {
  if (err) {
    throw err
  }
  console.log(`Loaded backup from ${data.date.toLocaleString()}`)
  antSim = new AntSim(JSON.parse(data.backup))

  const backupSim = async () => {
    const backup = JSON.stringify(antSim.toExport())
    const backupDoc = new Backup({ date: new Date(), backup })
    await backupDoc.save()
    setTimeout(backupSim, oneDay * 0.5)
  }

  // wait 30 minutes then backup
  setTimeout(backupSim, 1000 * 60 * 30)

  setInterval(() => {
    antSim.update(TICK)
    const liveData = antSim.toLive()
    const antsData = JSON.stringify(liveData)
    listeners.forEach((listener) => {
      listener(antsData)
    })
  }, TICK)

  TableRouter.ws('/', (ws) => {
    console.log('table connection opened!')

    const listener = (data) => ws.send(data)
    listeners.push(listener)

    ws.on('close', () => {
      console.log('table connection closed!')
      listeners.splice(listeners.indexOf(listener), 1)
    })
  })
})
// TODO: saving / loading ant sim from persistent storage

export default TableRouter
