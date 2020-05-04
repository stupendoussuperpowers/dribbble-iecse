const mongoose = require('mongoose')

const designSchema = mongoose.Schema({
    design_url: {
        type: String,
        required: true
    }, 
    author: {
        type: String, 
        required: true
    },
    liked_by: {
        type: Array
    }
})

module.exports.designs = mongoose.model('designs', designSchema)
module.exports.designSchema = designSchema