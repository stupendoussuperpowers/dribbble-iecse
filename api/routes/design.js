const app = require('express').Router()

const upload = require('./uploadaws')

const designs = require('../models/design').designs
const users = require('../models/user')

app.get('/explore', async (req, res) => {
    
    const designList = await designs.find({}, '_id design_url author liked_by').limit(10)

    return res.send({status:200, data:designList})
})


app.get('/:id', async (req, res) => {
    
    var postid = req.params["id"]

    const postList = await designs.find({"_id":postid})
    const post = postList[0]

    res.send({status:200, data:post})

})

app.post('/like', async (req, res) => {
    if( !(req.body.postID)){
        return res.send({status: 400, data: "Specify Post ID"})
    }
    const postList = await designs.find({"_id": req.body.postID})
    
    const post = postList[0]

    try{
        console.log("The user is:", req.user)
        post.liked_by.push(req.user.username)
        post.save()
        res.send({status:200, data: "Post Liked"})
    }catch(e){
        res.send({status:400, data:e})
        return
    }
})

app.post('/create', upload.single('design'), async (req, res) => {
    if( !req.body.file ){
        res.send({status: 400, data: "Please Create a Complete Design"})
        return 
    }

    console.log("This is the new design url:", req.file.location)

    const newDesign = {
        design_url: req.file.location,
        author: req.user.username,
        liked_by: []
    }

    var doc;

    try{
        doc = await designs.create(newDesign)
        console.log("Doc", doc)
    }catch(e){
        console.log(e)
        return res.send({status:500,data: e })
    }

    //if (err) return res.send({status:500,data: err})

    try{
        const userList = await users.find({username:req.user.username})

        const user = userList[0]

        console.log(user.designs)

        if(!user.designs || user.designs.length == 0){
            user.designs = []
        }
        user.designs.push(doc)
        user.save()

        res.send({status:200, data:"Design added"})
        return 
    } catch(e){
        console.log("Error",e);
        res.send({status:400, data:e})
        return
    }
})

module.exports = app