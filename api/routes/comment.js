const app = require('express').Router()

const designs = require('../models/design').designs
const comments = require('../models/comment')


app.post('/add', async (req, res) => {
    if(!(req.body.parent && req.body.content)){
        return res.send({status:400, data:'Complete Form'})
    }

    const postList = await designs.find({"_id":req.body.parent})
    const post = postList[0]

    const newComment = {
        parent: req.body.parent,
        author: req.user.username,
        content: req.body.content
    }

    var doc;

    try{
        doc = await comments.create(newComment)
        console.log("Doc", doc)
    }catch(e){
        console.log(e)
        return res.send({status:500,data: e })
    }

    //if (err) return res.send({status:500,data: err})

    try{
        post.comments.push(doc)
        post.save()
        // user.designs.push(doc)
        // user.save()

        res.send({status:200, data:"Comment added"})
        return 
    } catch(e){
        console.log("Error",e);
        res.send({status:400, data:e})
        return
    }
})

module.exports = app