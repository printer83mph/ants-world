import express from 'express'
import AntSim from '../models/ant-sim'

const TICK = 150

const TableRouter = express.Router()
const listeners = []

const antSim = new AntSim()
// TODO: saving / loading ant sim from persistent storage

setInterval(() => {
  antSim.update(TICK)
  const liveData = antSim.toLive()
  const antsData = JSON.stringify(liveData)
  listeners.forEach((listener) => {
    listener(antsData)
  })
}, TICK)

TableRouter.ws('/', (ws) => {
  console.log('connection opened!')

  listeners.push((data) => ws.send(data))

  ws.on('close', () => {
    console.log('connection closed!')
    listeners.splice(listeners.indexOf(ws.send), 1)
  })
})

export default TableRouter
