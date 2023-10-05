const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const authModel = require('../models/auth.model')
require('dotenv').config()

const { JWT_PRIVATE_KEY } = process.env
const authController = {
  login: async (req, res) => {
    try {
      const { email, password } = req.body
      if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required!' })
      }
      const result = await authModel.login(email)

      if (!result) {
        return res.status(404).json({ message: 'Unregistered email!' })
      }
      const verify = bcrypt.compareSync(password, result.password)
      if (!verify) {
        return res.status(401).json({ message: 'Wrong password!' })
      }
      delete result.password
      const token = jwt.sign(result, JWT_PRIVATE_KEY, { expiresIn: '1d' })
      return res.status(200).json({ token: `Bearer ${token}`, user: result })
    } catch (error) {
      console.error('Error while logging in:', error)
      return res.status(500).json({ message: 'Internal server error' })
    }
  }
}

module.exports = authController
