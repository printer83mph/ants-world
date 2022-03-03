import app from './app'

require('dotenv').config()

const port = process.env.PORT ?? 8000

app.listen(port, () => {
  console.log(`Listening on port ${port}!`)
})

export {}
