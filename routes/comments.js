require('../data/database');
const express = require('express');
const router = express.Router();
const CommentController = require('../controllers/commentsController');
var validator = require("express-joi-validation").createValidator({  passError: true });
var {commentSchema} = require("../Models/Validation/CommentValid");

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

router.get('/' , CommentController.getAll)
router.get('/:id' , CommentController.findOne)
router.post('/user' , CommentController.getByUserId)
router.post('/' , validator.body(commentSchema),joiErrors,CommentController.create);
router.put('/:id', validator.body(commentSchema),joiErrors,CommentController.update)
router.patch('/:id', validator.body(commentSchema),joiErrors,CommentController.update)
router.delete('/:id' , CommentController.delete)

module.exports = router
