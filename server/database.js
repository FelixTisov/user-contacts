let mysql = require('mysql')
const db = mysql.createConnection({
  host: process.env.DBhost,
  user: process.env.DBuser,
  password: process.env.DBpassword,
  database: process.env.DBname,
  port: 3306,
})

module.exports = db
