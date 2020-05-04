const auth = require('./auth')
const design = require('./design')
const profile = require('./profile')
const comment = require('./comment')

const app = require('express').Router()

const userLoggedIn = (req, res, next) => {
    if(req.isAuthenticated()) return next()
    else return res.send({status:400, data:"Login First"})
}

app.use('/auth', auth)

app.use('/design', userLoggedIn, design)

app.use('/profile', userLoggedIn, profile)

app.use('/comment', userLoggedIn, comment)

module.exports = app