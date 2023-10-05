/* eslint-disable camelcase */
/* eslint-disable no-undef */
const experienceModel = require('../models/experience.model')
const { v4: uuidv4 } = require('uuid')
// const fs = require('fs')
// const path = require('path')

const experienceController = {
  get: async (req, res) => {
    try {
      const result = await experienceModel.get()
      return res.status(200).send({ message: 'succes', data: result })
    } catch (error) {
      res.status(500).send({ message: error })
    }
  },
  getDetail: async (req, res) => {
    try {
      const id = req.params.id
      console.log(id)
      const result = await experienceModel.getDetail(id)
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
        id_experience: uuidv4(),
        project_name: req.body.project_name,
        project_description: req.body.project_description,
        star: req.body.star,
        end_date: req.body.end_date,
        link_deploy: req.body.link_deploy,
        link_repo: req.body.link_repo
      }
      // console.log(payload)
      // console.log(payload.id_experience)
      const result = await experienceModel.add(payload)
      return res.status(201).send({ message: 'succes', data: result })
    } catch (error) {
      return res.status(500).send({ message: error.message })
    }
  },
  update: async (req, res) => {
    try {
      const id = req.params.id
      const { project_name, project_description, star, end_date, link_deploy, link_repo } = req.body
      console.log(project_name)

      const prevExpereince = await experienceModel.getDetail(id)
      console.log(prevExpereince)

      const updateProject_name = project_name || prevExpereince.project_name
      const updateProject_description = project_description || prevExpereince.project_description
      const updateStar = star || prevExpereince.star
      const updateEnd_date = end_date || prevExpereince.end_date
      const updateLink_deploy = link_deploy || prevExpereince.link_deploy
      const updateLink_repo = link_repo || prevExpereince.link_repo
      // console.log(id)
      // console.log(updateName)
      // console.log(name)
      const result = await experienceModel.update({ id, project_name: updateProject_name, project_description: updateProject_description, star: updateStar, end_date: updateEnd_date, link_deploy: updateLink_deploy, link_repo: updateLink_repo })
      return res.status(201).send({ message: 'success', data: result })
    } catch (error) {
      return res.status(500).send({ message: error.message })
    }
  },
  remove: async (req, res) => {
    try {
      id = req.params.id
      const result = await experienceModel.remove(id)
      return res.status(200).send({ message: 'success', data: result })
    } catch (error) {
      return res.status(500).send({ message: error.message })
    }
  }
}

module.exports = experienceController
