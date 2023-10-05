const express = require('express')
const router = express.Router()
// const formUpload = require('../../helpers/formUpload')

const experienceController = require('../controllers/experience.controller')

router.get('/', experienceController.get)
router.get('/:id', experienceController.getDetail)
router.post('/', experienceController.add)
router.patch('/:id', experienceController.update)
router.delete('/:id', experienceController.remove)

module.exports = router
