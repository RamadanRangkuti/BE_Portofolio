/* eslint-disable camelcase */
/* eslint-disable no-undef */
const schoolModel = require('../models/school.model')
const { v4: uuidv4 } = require('uuid')

const schoolController = {
  get: async (req, res) => {
    try {
      const result = await schoolModel.get()
      return res.status(200).send({ message: 'succes', data: result })
    } catch (error) {
      res.status(500).send({ message: error })
    }
  },
  getDetail: async (req, res) => {
    try {
      const id = req.params.id
      console.log(id)
      const result = await schoolModel.getDetail(id)
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
        id_school: uuidv4(),
        school_city: req.body.school_city,
        category: req.body.category,
        grade: req.body.grade,
        major: req.body.major,
        school_name: req.body.school_name
      }
      console.log(payload)
      const result = await schoolModel.add(payload)
      return res.status(201).send({ message: 'succes', data: result })
    } catch (error) {
      return res.status(500).send({ message: error.message })
    }
  },
  update: async (req, res) => {
    try {
      const id = req.params.id
      const { school_city, category, grade, major, school_name } = req.body
      console.log(school_city)

      const prevSchool = await schoolModel.getDetail(id)
      console.log(prevSchool)

      const updateSchool_city = school_city || prevSchool.school_city
      const updateCategory = category || prevSchool.category
      const updateGrade = grade || prevSchool.grade
      const updateMajor = major || prevSchool.major
      const updateSchool_name = school_name || prevSchool.school_name
      const result = await schoolModel.update({ id, school_city: updateSchool_city, category: updateCategory, grade: updateGrade, major: updateMajor, school_name: updateSchool_name })
      return res.status(201).send({ message: 'success', data: result })
    } catch (error) {
      return res.status(500).send({ message: error.message })
    }
  },
  remove: async (req, res) => {
    try {
      id = req.params.id
      const result = await schoolModel.remove(id)
      return res.status(200).send({ message: 'success', data: result })
    } catch (error) {
      return res.status(500).send({ message: error.message })
    }
  }
}

module.exports = schoolController
