const express = require('express')

const BoardRouter = express.Router()

BoardRouter.get('/', (req, res) => {
  res.json({ message: 'Hello World!' })
})

module.exports = BoardRouter
