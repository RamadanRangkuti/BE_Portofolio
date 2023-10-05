/* eslint-disable camelcase */
/* eslint-disable no-undef */
const skillModel = require('../models/skill.model')
const { v4: uuidv4 } = require('uuid')

const skillController = {
  get: async (req, res) => {
    try {
      const result = await skillModel.get()
      return res.status(200).send({ message: 'succes', data: result })
    } catch (error) {
      res.status(500).send({ message: error })
    }
  },
  getDetail: async (req, res) => {
    try {
      const id = req.params.id
      console.log(id)
      const result = await skillModel.getDetail(id)
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
        id_skill: uuidv4(),
        skill_name: req.body.skill_name,
        skill_level: req.body.skill_level
      }
      console.log(payload)
      const result = await skillModel.add(payload)
      return res.status(201).send({ message: 'succes', data: result })
    } catch (error) {
      return res.status(500).send({ message: error.message })
    }
  },
  update: async (req, res) => {
    try {
      const id = req.params.id
      const { skill_name, skill_level } = req.body
      console.log(skill_name)

      const prevSkill = await skillModel.getDetail(id)
      console.log(prevSkill)

      const updateSkill_name = skill_name || prevSkill.skill_name
      const updateSkill_level = skill_level || prevSkill.skill_level
      const result = await skillModel.update({ id, skill_name: updateSkill_name, skill_level: updateSkill_level })
      return res.status(201).send({ message: 'success', data: result })
    } catch (error) {
      return res.status(500).send({ message: error.message })
    }
  },
  remove: async (req, res) => {
    try {
      id = req.params.id
      const result = await skillModel.remove(id)
      return res.status(200).send({ message: 'success', data: result })
    } catch (error) {
      return res.status(500).send({ message: error.message })
    }
  }
}

module.exports = skillController
