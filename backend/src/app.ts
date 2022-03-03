import createError from 'http-errors'
import express from 'express'
import cookieParser from 'cookie-parser'
import logger from 'morgan'

// serve static stuff from public
// app.use(express.static(path.join(__dirname, 'public')))

const app = express()
require('express-ws')(app)

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())

app.use('/table', require('./routes/table'))

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

export default app
