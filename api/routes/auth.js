const users = require('../models/user')

const app = require('express').Router()

function makePass(pass){
    return pass
}

function makeId(){
    return 0274;
}

app.get('/curruser', async (req, res) => {

    console.log(req.user.username);

    const userList = await users.find({"username": req.user.username}, 'username followers  following designs email bio')
    console.log(userList)
    const user = userList[0]

    console.log(user)

    return res.send({status:200, data: user})
})

app.post('/login', async (req, res) => {
    console.log(req.body)
    if(! (req.body.username && req.body.password)){
        res.send({status: 400, data: "Incomplete Form"})
        return 
    }

    const userList = await users.find({username: req.body.username})

    console.log(userList);

    const user = userList[0]

    if(user.password == req.body.password){
        req.logIn({username:req.body.username}, (err) => {
            if(err) return res.send({status: 400, data: "Invalid Credentials"})
            else return res.send({status:200, data: "Logged in"})
        })
    }

})

app.post('/register', async (req, res) => {
    if(! (req.body.username && req.body.password && req.body.password2 && req.body.email)){
        res.send({status: 400, data: "Incomplete Form"})
        return 
    }

    var username = req.body.username
    var pass1 = req.body.password
    var pass2 = req.body.password2

    const emailList = users.find({emailid: req.body.email})

    console.log(emailList)

    if (emailList.length > 0){
        res.send({status: 400, data: "Email ID already taken"})
        return
    }
    
    const userList = await users.find({username: username})
    if (userList.length > 0){
        res.send({status: 400, data: "Username Already Taken"})
        return 
    }

    users.create({
        username: username,
        id: makeId(),
        email: req.body.email, 
        password: makePass(pass1),
        designs: [], 
        bio: '',
        following: [],
        followers: []
    }, (err, doc) => {
        if(err){
            res.send({status:500, data:err})
        } else {
            res.send({status:200, data: "Proceed to Login"})
        }
    })
 
})


module.exports = app