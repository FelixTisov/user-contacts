const express = require('express')
const cors = require('cors')

const app = express()

require('dotenv').config()

app.use(cors())
app.use(express.json({ extended: true }))
app.use('/user', require('./routes/auth.routes'))
// app.use('/api/data', require('./routes/data.routes'))

const PORT = process.env.PORT

async function start() {
  const db = require('./database')

  try {
    app.listen(PORT, () => console.log(`App has been started on port ${PORT}`))
    db.connect()
  } catch (error) {
    console.error('Server error: ', error.message)
    process.exit(1)
  }
}

start()
