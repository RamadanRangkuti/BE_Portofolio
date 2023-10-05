const express = require('express')
const router = express.Router()
// const { authentication } = require('../../middlewares/auth.middleware')

const profileRoute = require('./profile.route')
const experienceRoute = require('./experience.route')
const technologyRoute = require('./technology.route')
const schoolRoute = require('./school.route')
const skillRoute = require('./skill.route')
const authRoute = require('./auth.route')

router.get('/', (req, res) => {
  return res.send('BACKEND FOR PORTOFOLIO WEB')
})

router.use('/auth', authRoute)
router.use('/profile', profileRoute)
router.use('/experience', experienceRoute)
router.use('/technology', technologyRoute)
router.use('/school', schoolRoute)
// router.use('/school', authentication, schoolRoute)
router.use('/skill', skillRoute)

module.exports = router
