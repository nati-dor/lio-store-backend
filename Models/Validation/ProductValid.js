const Joi = require("joi");

const productSchema = Joi.object({
    _id: Joi.string(),
    __v: Joi.number(),
    id: Joi.string().min(2).max(12),
    title: Joi.string().min(2).max(200),
    productDetails: Joi.string().min(2).max(1000),
    orders: Joi.number().min(0),
    reviews: Joi.number().min(0),
    rating: Joi.number().min(0).max(5),
    price: Joi.number().min(0),
    oldPrice: Joi.number().min(0),
    isSale: Joi.boolean(),
    isNew: Joi.boolean(),
    arrImg: Joi.array(),
    bigImg: Joi.string()
  });
  
  
  module.exports = {
    productSchema
  };