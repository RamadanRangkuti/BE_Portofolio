const express = require('express')
const router = express.Router()
// const formUpload = require('../../helpers/formUpload')

const technologyController = require('../controllers/tech.controller')

router.get('/', technologyController.get)
router.get('/:id', technologyController.getDetail)
router.post('/', technologyController.add)
router.patch('/:id', technologyController.update)
router.delete('/:id', technologyController.remove)

module.exports = router
