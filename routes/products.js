require('../data/database');
const express = require('express');
const router = express.Router();
const ProductsController = require('../controllers/ProductsController');
const validator = require("express-joi-validation").createValidator({  passError: true });
const {productSchema} = require("../Models/Validation/ProductValid");

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

router.get('/' , ProductsController.getAll)
router.get('/:id' , ProductsController.findOne)
router.post('/' ,validator.body(productSchema),joiErrors, ProductsController.create);
router.put('/:id',validator.body(productSchema),joiErrors, ProductsController.update)
router.patch('/:id',validator.body(productSchema),joiErrors, ProductsController.update)
router.delete('/:id' , ProductsController.delete)

module.exports = router