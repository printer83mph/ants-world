require('dotenv').config()

const port = process.env.PORT ?? 80

require('./app').default.listen(port, () => {
  console.log(`Listening on port ${port}!`)
})

export {}
