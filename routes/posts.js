require('../data/database');
const express = require('express');
const router = express.Router();
const PostsController = require('../controllers/PostsController');
var validator = require("express-joi-validation").createValidator({  passError: true });
var {postSchema} = require("../Models/Validation/PostValid");

const joiErrors = function(err,req, res, next){
    if (err && err.error && err.error.isJoi) {
  
      const errors = [];
        
      err.error.details.forEach(err => {
        const error = {}
        error.field = err.message.split("\"")[1];
        error.message = err.message.split("\" ")[1]
        errors.push(error)
      });
      res.status(400).json({message: errors});
    } else {
      next(err);
    }
  }

router.get('/' , PostsController.getAll)
router.get('/:id' , PostsController.findOne)
router.post('/user' , PostsController.getByUserId)
router.post('/addcomments' , PostsController.addComments)
router.post('/' ,validator.body(postSchema),joiErrors, PostsController.create);
router.put('/:id',validator.body(postSchema),joiErrors, PostsController.update)
router.patch('/:id',validator.body(postSchema),joiErrors, PostsController.update)
router.delete('/:id' , PostsController.delete)

module.exports = router