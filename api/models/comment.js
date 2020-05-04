const mongoose = require('mongoose')

const commentSchema = mongoose.Schema({
    parent:{
        type: String,
        required: true,
    },
    author:{
        type: String,
        required: true
    },
    content:{
        type: String,
        required: true
    }
})

module.exports = mongoose.model('comments', commentSchema)