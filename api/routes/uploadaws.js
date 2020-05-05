//const app = require('express').Router()
require("dotenv").config();

const multer = require('multer')
const multers3 = require('multer-s3')
const aws = require('aws-sdk')

console.log(process.env.AWS_SECRET)

aws.config.update({
    accessKeyId: process.env.AWS_KEY,
    secretAccessKey: process.env.AWS_SECRET,
    region: process.env.REGION
})

const s3 = new aws.S3()

var upload = multer({
    storage: multers3({
      s3: s3,
      bucket: 'dribbblebucker',
      metadata: function (req, file, cb) {
        cb(null, {fieldName: "Test data my man"});
      },
      key: function (req, file, cb) {
        cb(null, Date.now().toString())
      }
    })
  })

// app.post('/uploaddesign', upload.single('design') , (req, res) => {
//     res.send({status: 200, data: "Design Uploaded Successfully"})
// })

module.exports = upload