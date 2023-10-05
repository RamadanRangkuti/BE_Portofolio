const express = require('express')
const router = express.Router()

const schoolController = require('../controllers/school.controller')

router.get('/', schoolController.get)
router.get('/:id', schoolController.getDetail)
router.post('/', schoolController.add)
router.patch('/:id', schoolController.update)
router.delete('/:id', schoolController.remove)

module.exports = router
