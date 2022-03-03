import express from 'express'
import AntSim from '../models/ant-sim'

const TICK = 100

const TableRouter = express.Router()
const listeners = []

const { update } = AntSim()
// TODO: saving / loading ant sim from persistent storage

setInterval(() => {
  const antsData = JSON.stringify(update(TICK))
  listeners.forEach((listener) => {
    listener(antsData)
  })
}, TICK)

TableRouter.ws('/', function (ws, res) {
  console.log('connection opened!')

  listeners.push((data) => ws.send(data))

  ws.on('close', function () {
    console.log('connection closed!')
    listeners.splice(listeners.indexOf(ws.send), 1)
  })
})

module.exports = TableRouter
