const express = require('express')
const cors = require('cors')

const app = express()

require('dotenv').config()

app.use(cors())
app.use(express.json({ extended: true }))
app.use('/user', require('./routes/auth.routes'))
app.use('/contacts', require('./routes/contacts.routes'))

const PORT = process.env.PORT

let server

// Запуск сервера
async function start() {
  const db = require('./database')

  try {
    server = app.listen(PORT, () =>
      console.log(`App has been started on port ${PORT}`)
    )
    db.connect()
  } catch (error) {
    console.error('Server error: ', error.message)
    process.exit(1)
  }
}

function stop() {
  server.close()
}

start()

module.exports = { app, stop }
