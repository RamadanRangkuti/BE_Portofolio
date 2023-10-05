const express = require('express')
const router = express.Router()
const formUpload = require('../../helpers/formUpload')

const profileController = require('../controllers/profile.controller')

router.get('/', profileController.get)
router.get('/:id', profileController.getDetail)
router.post('/', formUpload.single('picture'), profileController.add)
router.patch('/:id', formUpload.single('picture'), profileController.update)
router.delete('/:id', profileController.remove)

module.exports = router
