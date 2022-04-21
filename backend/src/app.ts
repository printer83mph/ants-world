import mongoose from 'mongoose'
import express, { ErrorRequestHandler } from 'express'
import session from 'express-session'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import logger from 'morgan'
import path from 'path'

// serve static stuff from public
// app.use(express.static(path.join(__dirname, 'public')))

mongoose.connect(process.env.MONGO_URI)

const app = express()
require('express-ws')(app)

const oneDay = 1000 * 60 * 60 * 24

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: oneDay * 15,
      secure: false,
    },
  })
)

app.use(cors())
app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())

app.use('/table', require('./routes/table').default)
app.use('/collection-api', require('./routes/collection').default)
app.use('/auth', require('./routes/auth').default)

// serve frontend
app.use(express.static('../frontend/dist'))

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../../frontend/dist', 'index.html'))
})

// custom error handler
const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  if (!res.headersSent) {
    res.status(500)
  }
  res.json({ message: err.message || 'Something went wrong!' })
}
app.use(errorHandler)

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
