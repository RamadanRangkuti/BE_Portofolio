/* eslint-disable no-undef */
const profileModel = require('../models/profile.model')
const { v4: uuidv4 } = require('uuid')
const fs = require('fs')
const path = require('path')
const bycrpt = require('bcryptjs')

const profileController = {
  get: async (req, res) => {
    try {
      const result = await profileModel.get()
      return res.status(200).send({ message: 'succes', data: result })
    } catch (error) {
      res.status(500).send({ message: error })
    }
  },
  getDetail: async (req, res) => {
    try {
      const id = req.params.id
      console.log(id)
      const result = await profileModel.getDetail(id)
      if (result != null) {
        return res.status(200).send({ message: 'succes get detail', data: result })
      } else {
        return res.status(404).send({ message: 'Sorry data not found please check your input ID' })
      }
    } catch (error) {
      return res.status(500).send({ message: error.message })
    }
  },
  add: async (req, res) => {
    try {
      console.log('Req File:', req.file)
      console.log('Req Body:', req.body)
      if (!req.file) {
        return res.status(400).send({ message: 'Please upload a picture' })
      }
      const payload = {
        id_profile: uuidv4(),
        name: req.body.name,
        email: req.body.email,
        password: bycrpt.hashSync(req.body.password, 11),
        picture: req.file.filename,
        description: req.body.description
      }
      console.log(payload.id_profile)
      const result = await profileModel.add(payload)
      return res.status(201).send({ message: 'succes', data: result })
    } catch (error) {
      return res.status(500).send({ message: error.message })
    }
  },
  update: async (req, res) => {
    try {
      const id = req.params.id
      const { name, email, password, description } = req.body
      // console.log(description)

      const prevProfile = await profileModel.getDetail(id)
      console.log(prevProfile)
      const picture = req.file ? req.file.filename : prevProfile.picture // ternary operator

      const updateName = name || prevProfile.name
      const updateEmail = email || prevProfile.email
      const updatePassword = password || prevProfile.password
      const updateDescription = description || prevProfile.description
      console.log(password)
      // console.log(updateName)
      // console.log(name)
      console.log(updateDescription)
      const result = await profileModel.update({ id, name: updateName, email: updateEmail, password: bycrpt.hashSync(updatePassword, 11), picture, description: updateDescription })

      if (prevProfile.picture && prevProfile.picture !== picture) {
        const filePath = path.join(__dirname, '..', '..', 'public', 'uploads', 'images', prevProfile.picture)
        fs.unlink(filePath, (err) => {
          if (err) {
            console.error('Failed to delete old file:', err)
          }
        })
      }
      return res.status(201).send({ message: 'success', data: result })
    } catch (error) {
      return res.status(500).send({ message: error.message })
    }
  },
  remove: async (req, res) => {
    try {
      id = req.params.id
      const result = await profileModel.remove(id)
      return res.status(200).send({ message: 'success', data: result })
    } catch (error) {
      return res.status(500).send({ message: error.message })
    }
  }
}

module.exports = profileController
