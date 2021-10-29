require('../data/database');
const express = require('express');
const router = express.Router();
const UsersController = require('../controllers/userController');
var validator = require("express-joi-validation").createValidator({  passError: true });
var {userSchema} = require("../Models/Validation/UserValid");

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
router.patch('/getbyemail', UsersController.getByEmail)
router.get('/' , UsersController.getAll)
router.get('/:id' , UsersController.findOne)
router.post('/' ,validator.body(userSchema),joiErrors, UsersController.create);
router.put('/:id', UsersController.update)
router.delete('/:id' , UsersController.delete)

module.exports = router