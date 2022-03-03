import express from 'express'
import AntSim from '../models/ant-sim'

const TICK = 100

const TableRouter = express.Router()
const listeners: ((data: string) => any)[] = []

const antSim = new AntSim()
// TODO: saving / loading ant sim from persistent storage

setInterval(() => {
  antSim.update(TICK)
  const antsData = JSON.stringify(antSim.state)
  listeners.forEach((listener) => listener(antsData))
}, TICK)

TableRouter.get('/', (req, res) => {
  listeners.push(res.write)
  req.on('close', () => {
    listeners.splice(listeners.indexOf(res.write), 1)
  })
})

export default TableRouter
