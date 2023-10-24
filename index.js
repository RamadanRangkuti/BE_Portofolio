const express = require('express')
const app = express()
const cors = require('cors')
require('dotenv').config()
const router = require('./src/routes/index')

const PORT = process.env.SERVER_PORT || 5000
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
app.listen(PORT, () => {
  console.log(`Server Running on PORT ${PORT}`)
})

app.get('*', (req, res) => {
  return res.send({ status: 404, message: 'not found' })
})
