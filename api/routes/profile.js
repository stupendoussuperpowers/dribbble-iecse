const app = require('express').Router()

const users = require('../models/user')

app.get('/withid/:id', async (req, res)=> {
    var id = req.params["id"]

    console.log(id)

    const user = await users.findById( req.params.id, '_id username designs followers following email')
    //const user = userList[0]

    //console.log("Users are:", userList)

    res.send({status:200, data: user})
})

app.get('/:id', async (req, res) => {


    var username = req.params["id"]

    console.log("The user id is", username)

    const userList = await users.find({"username" : username}, '_id username designs followers following email')
    const user = userList[0]

    console.log("Users are:", userList)

    res.send({status:200, data: user})

})

app.post('/addbio', async (req, res) => {
    if(!(req.body.bio)){
        res.send({status:400, data: "Please add a bio"})
        return 
    }

    try{
        const userList = await users.findOneAndUpdate({username:req.user.username}, {"$set":{bio: req.body.bio}})
        res.send({status:200, data: "Added Bio"})
    } catch(e){
        return res.send({status:400, data: e})
    }
    
})

app.post('/follow', async (req, res) => {
    if(!req.body.messiah){
        res.send({status:400, data:"Not sure who to follow"})
        return 
    }

    try {
        const userList = await users.find({username: req.user.username})
        const userFollower = userList[0]
        const messiahList = await users.find({username: req.body.messiah})
        const messiah = messiahList[0]

        for(var user in messiah.followers){
            if(messiah.followers[user] == userFollower._id){
                return res.send({status:400, data:"Already Following"})
            }
        }
        
        userFollower.following.push(messiah._id)
        
        userFollower.save()

        messiah.followers.push(userFollower._id)

        messiah.save()

        res.send({status:200, data:"Follow Success"})
        return 
    } catch(e) {
        console.log(e)
        res.send({status:400, data: e})
    }

})

module.exports = app