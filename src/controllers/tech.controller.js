/* eslint-disable camelcase */
/* eslint-disable no-undef */
const technologyModel = require('../models/tech.model')
const { v4: uuidv4 } = require('uuid')

const technologyController = {
  get: async (req, res) => {
    try {
      const result = await technologyModel.get()
      return res.status(200).send({ message: 'succes', data: result })
    } catch (error) {
      res.status(500).send({ message: error })
    }
  },
  getDetail: async (req, res) => {
    try {
      const id = req.params.id
      console.log(id)
      const result = await technologyModel.getDetail(id)
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
      const payload = {
        id_exptech: uuidv4(),
        id_experience: req.body.id_experience,
        techname: req.body.techname
      }
      console.log(payload)
      const result = await technologyModel.add(payload)
      return res.status(201).send({ message: 'succes', data: result })
    } catch (error) {
      return res.status(500).send({ message: error.message })
    }
  },
  update: async (req, res) => {
    try {
      const id = req.params.id
      const { id_experience, techname } = req.body
      console.log(techname)

      const prevTech = await technologyModel.getDetail(id)
      console.log(prevTech)

      const updateId_experience = id_experience || prevTech.id_experience
      const updateTechname = techname || prevTech.techname
      const result = await technologyModel.update({ id, id_experience: updateId_experience, techname: updateTechname })
      return res.status(201).send({ message: 'success', data: result })
    } catch (error) {
      return res.status(500).send({ message: error.message })
    }
  },
  remove: async (req, res) => {
    try {
      id = req.params.id
      const result = await technologyModel.remove(id)
      return res.status(200).send({ message: 'success', data: result })
    } catch (error) {
      return res.status(500).send({ message: error.message })
    }
  }
}

module.exports = technologyController
