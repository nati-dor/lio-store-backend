const Joi = require("joi");

const orderSchema = Joi.object({
    _id: Joi.string(),
    __v: Joi.number(),
    id: Joi.string().min(2).max(12),
    userId: Joi.any(),
    totalPrice: Joi.number().positive(),
    date: Joi.date(),
    products: Joi.any(),
    percentageDiscount: Joi.number().min(0).max(1000),
    status: Joi.string().min(2).max(15),
  });
  
  
  module.exports = {
    orderSchema
  };