const express = require('express')
const router = express.Router()
// const formUpload = require('../../helpers/formUpload')

const skillController = require('../controllers/skill.controller')

router.get('/', skillController.get)
router.get('/:id', skillController.getDetail)
router.post('/', skillController.add)
router.patch('/:id', skillController.update)
router.delete('/:id', skillController.remove)

module.exports = router
