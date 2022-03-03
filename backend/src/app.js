const createError = require('http-errors')
const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const logger = require('morgan')

const app = express()

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())

// serve static stuff from public
// app.use(express.static(path.join(__dirname, 'public')))

// routers
const TableRouter = require('./routes/table')

app.use('/table', TableRouter)

// catch 404 and forward to error handler
app.use((req, res) => {
  res.status(404).send(createError(404, 'Route not found!'))
})

// error handler
// app.use((err, req, res, next) => {
//   // set locals, only providing error in development
//   res.locals.message = err.message
//   res.locals.error = req.app.get('env') === 'development' ? err : {}

//   // render the error page
//   res.status(err.status || 500)
//   res.render('error')
// })

module.exports = app
