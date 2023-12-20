const express = require('express')

require('dotenv').config()

const app = express()

app.use(express.json({ extended: true }))
app.use('/user', require('./routes/auth.routes'))
// app.use('/api/data', require('./routes/data.routes'))

const PORT = process.env.PORT

async function start() {
  try {
    app.listen(PORT, () => console.log(`App has been started on port ${PORT}`)) // Запускаем сервер
  } catch (error) {
    console.error('Server error: ', error.message)
    process.exit(1)
  }
}

start()
