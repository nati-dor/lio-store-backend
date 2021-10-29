require('../data/database');
const express = require('express');
const router = express.Router();
const OrdersController = require('../controllers/ordersController');
var validator = require("express-joi-validation").createValidator({  passError: true });
var {orderSchema} = require("../Models/Validation/OrderValid");

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
router.get('/:id' , OrdersController.findOne)
router.get('/' , OrdersController.getAll)
router.post('/user' , OrdersController.getByUserId)
router.post('/' ,validator.body(orderSchema),joiErrors, OrdersController.create);
router.put('/:id',validator.body(orderSchema),joiErrors, OrdersController.update)
router.patch('/',validator.body(orderSchema),joiErrors, OrdersController.update)
router.delete('/:id' , OrdersController.delete)

module.exports = router