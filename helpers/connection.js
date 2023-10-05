const { Client } = require('pg')
require('dotenv').config({ path: '../.env' })

const db = new Client({
  user: process.env.USER,
  host: process.env.HOST,
  database: process.env.DATABASE,
  password: process.env.PASSWORD,
  port: process.env.PORT
})
db.connect((err) => {
  if (err) {
    console.log('db connection error', err)
  }
})

module.exports = db
