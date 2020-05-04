const mongoose = require('mongoose')

const designSchema = require('./design').designSchema

const userSchema = new mongoose.Schema({
    username: {
        type: String, 
        required: true
    }, 
    password: {
        type: String, 
        required: true
    },
    email: {
        type: String, 
        required: true
    },
    bio: {
        type: String,
        
    },
    followers: {
        type: [String],
    },
    following: {
        type: [String],
    },
    designs: {
        type: [designSchema],
    }
})

module.exports = mongoose.model('users', userSchema);