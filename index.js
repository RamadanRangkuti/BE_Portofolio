const express = require('express')
const app = express()
const cors = require('cors')
require('dotenv').config()
const router = require('./src/routes/index')

const { SERVER_PORT } = process.env
app.use(cors())
app.use(express.static('public'))
// menerima application/www.form-encoded
// eslint-disable-next-line no-undef
app.use(express.urlencoded({ extended: true }))
// menerima json
// eslint-disable-next-line no-undef
app.use(express.json())

// console.log(SERVER_PORT)
app.use('/api/v1/', router)
app.listen(SERVER_PORT, () => {
  console.log(`Server Running on PORT ${SERVER_PORT}`)
})

app.get('*', (req, res) => {
  return res.send({ status: 404, message: 'not found' })
})
