// CLOUDINARY
const cloudinary = require('cloudinary').v2
const { CloudinaryStorage } = require('multer-storage-cloudinary')
const multer = require('multer')
require('dotenv').config({ path: '../.env' })

// console.log(process.env.API_KEY)
// console.log(process.env.API_SECRET)

// Setup cloudinary
cloudinary.config({
  cloud_name: 'dbyffkigp',
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET
})

// connecting cloudinary setup with CloudinaryStorage
const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'assets',
    format: async (req, file) => 'png',
    public_id: (req, file) => ''
  }
})

const parser = multer({ storage:storage})
module.exports = parser

// UPLOAD FILE TO PUBLIC
/* eslint-disable n/no-callback-literal */
// const multer = require('multer')
// const path = require('path')

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, 'public/uploads/images/')
//   },
//   filename: function (req, file, cb) {
//     cb(null, `${new Date().getTime()}-${file.originalname}`)
//   }
// })

// const formUpload = multer({
//   storage,
//   fileFilter: (req, file, callback) => {
//     const extFile = path.extname(file.originalname)
//     if (extFile !== '.png' && extFile !== '.jpeg' && extFile !== '.jpg') {
//       callback('Only images!', false)
//     } else {
//       callback(null, true)
//     }
//   },
//   limits: {
//     fileSize: 1048576 * 10 // 10mb
//   }
// })
// module.exports = formUpload
