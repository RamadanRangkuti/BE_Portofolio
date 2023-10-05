/* eslint-disable eqeqeq */
const jwt = require('jsonwebtoken')
require('dotenv').config()
const { JWT_PRIVATE_KEY } = process.env
// )
module.exports = {
  authentication: (req, res, next) => {
    try {
      const bearerToken = req.headers.token
      if (!bearerToken) {
        return res.status(401).send({ message: 'Token is required' })
        // return response(res, 401, 'Token is required')
      }
      const token = bearerToken.split(' ')[1]
      // console.log(token)
      // const decode = jwt.decode(token)
      /* decode berfungsi untuk memverifikasi token kita, jika valid akan di decode
      jika tidak valid masuk ke blok catch */
      const decode = jwt.verify(token, JWT_PRIVATE_KEY)
      // menyimpan data dari decode supaya bisa dipakai di authoriztion, pakai req karna di function sama-sama ada req.
      req.dataUser = decode
      // console.log(decode)
      // next syntax js untuk masuk ke step selanjutnya di routing
      next()
    } catch (error) {
      return res.status(401).send(error.message)
      // return response(res, 401, error)
    }
  }
}
