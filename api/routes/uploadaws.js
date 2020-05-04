//const app = require('express').Router()

const multer = require('multer')
const multers3 = require('multer-s3')
const aws = require('aws-sdk')

aws.config.update({
    accessKeyId: 'AKIAI2CR6VVQ3LFZU3EA',
    secretAccessKey: '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',
    region: 'us-west-1'
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