const Comment = require('../Models/Comment')
const { v4: uuidv4 } = require('uuid');

exports.getAll = async function (req, res, next) {
    try {
        const comments = await Comment.find().populate("userId");
        res.status(200).send(comments)
    } catch (error) {
        res.status(500).send(error.message)
    }
}

exports.findOne = async function (req, res) {
    try {
        const comment = await Comment.findOne({
            id: req.params.id
        });
        res.send(comment);
    } catch {
        res.status(404);
        res.send({
            error: "Comment doesn't exist!"
        });
    }
}

exports.getByUserId = async function (req, res, next) {
    try {
        const comment = await Comment.find({
            userId: req.body.userId ,
        })
        res.status(200).send(comment)
    } catch (error) {
        res.status(500).send(error.message)
    }
}

exports.create = async function (req, res) {
    const comment = new Comment({
        id: uuidv4().split('-')[0],
        email: req.body.email,
        body: req.body.body,
        userId: req.body.userId
    });
    await comment.save();
    res.send(comment);
}

exports.update = async function (req, res)  {
    try {
        const comment = await Comment.findOne({
            id: req.params.id
        });

        if (req.body.postId) 
            comment.postId = req.body.postId;
        if (req.body.name) 
            comment.name = req.body.name;
        if (req.body.email) 
        comment.email = req.body.email;
        if (req.body.body) 
        comment.body = req.body.body;
        if (req.body.userId) 
        comment.userId = req.body.userId;

        await comment.save();
        res.send(comment);
    } catch {
        res.status(404);
        res.send({
            error: "Comment doesn't exist!"
        });
    }
}

exports.delete = async function (req, res) {
    try {
        await Comment.deleteOne({
            id: req.params.id
        });
        res.status(204).send();
    } catch {
        res.status(404);
        res.send({
            error: "Comment doesn't exist!"
        });
    }
}