const Posts = require('../Models/Post')
const { v4: uuidv4 } = require('uuid');

exports.getAll = async function (req, res, next) {
    try {
        const posts = await Posts.find()
        .populate("userId")
        .populate({
            path: "comments",
            populate: { path: "commentId" },
          })
        res.status(200).send(posts)
    } catch (error) {
        res.status(500).send(error.message)
    }
}

exports.findOne = async function (req, res) {
    try {
        const post = await Posts.findOne({
            _id: req.params.id
        });
        res.send(post);
    } catch {
        res.status(404).
        res.send({
            error: "Post doesn't exist!"
        });
    }
}

exports.getByUserId = async function (req, res, next) {
    try {
        const posts = await Posts.find({
            userId: req.body.userId ,
        })
        res.status(200).send(posts)
    } catch (error) {
        res.status(500).send(error.message)
    }
}

exports.addComments = async function (req, res, next) {
    try {
        const post = await Posts.findOne({
            _id: req.body._id ,
        })
        if(post)
        post.comments.push({commentId:req.body.commentId})
        await post.save();
        res.status(200).send(post)
    } catch (error) {
        res.status(500).send(error.message)
    }
}

exports.create = async function (req, res) {
    const post = new Posts({
        id: uuidv4().split('-')[0],
        userId: req.body.userId,
        title: req.body.title,
        body: req.body.body,
        comments:req.body.comments,
    });
    await post.save();
    res.send(post);
}

exports.update = async function (req, res)  {
    try {
        const post = await Posts.findOne({
            id: req.params.id
        });
        if (req.body.title) 
        post.title = req.body.title;
        if (req.body.userId) 
        post.userId = req.body.userId;
        if (req.body.body) 
        post.body = req.body.body;
        if (req.body.comments) 
        post.comments = req.body.comments;

        await post.save();
        res.send(post);
    } catch(error) {
        res.status(404).send(error.message)
    }
}

exports.delete = async function (req, res) {
    try {
        await Posts.deleteOne({
            id: req.params.id
        });
        res.status(204).send();
    } catch {
        res.status(404);
        res.send({
            error: "Post doesn't exist!"
        });
    }
}