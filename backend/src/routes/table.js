const express = require('express')
const AntSim = require('../models/ant-sim')

const TICK = 100

const TableRouter = express.Router()
const listeners = []

const antSim = new AntSim({})

setInterval(() => {
  antSim.update(TICK)
  const antsData = JSON.stringify(antSim.ants)
  listeners.forEach((listener) => listener(antsData))
}, TICK)

TableRouter.get('/', (req, res) => {
  listeners.push(res.write)
  req.on('close', () => {
    listeners.splice(listeners.indexOf(res.write), 1)
  })
})

module.exports = TableRouter
