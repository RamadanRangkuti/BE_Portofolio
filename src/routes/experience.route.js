const express = require('express')
const router = express.Router()
const parser = require('../../helpers/formUpload')

const experienceController = require('../controllers/experience.controller')

router.get('/', experienceController.get)
router.get('/:id', experienceController.getDetail)
router.post('/', parser.single('image'), experienceController.add)
router.patch('/:id', parser.single('image'), experienceController.update)
router.delete('/:id', experienceController.remove)

module.exports = router
