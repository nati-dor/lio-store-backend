require('../data/database');
const express = require('express');
const router = express.Router();
const CouponsController = require('../controllers/CouponsController');
var validator = require("express-joi-validation").createValidator({  passError: true });
var {couponSchema} = require("../Models/Validation/CouponValid");

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

router.get('/' , CouponsController.getAll)
router.post('/getcouponbyname' , CouponsController.findOne)
router.post('/' ,validator.body(couponSchema),joiErrors, CouponsController.create);
router.put('/:id',validator.body(couponSchema),joiErrors, CouponsController.update)
router.patch('/:id',validator.body(couponSchema),joiErrors, CouponsController.update)
router.delete('/:id' , CouponsController.delete)

module.exports = router