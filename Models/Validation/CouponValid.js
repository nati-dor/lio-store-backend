const Joi = require("joi");

const couponSchema = Joi.object({
    _id: Joi.string(),
    __v: Joi.number(),
    id: Joi.string().min(2).max(12),
    name: Joi.string().required(),
    discount: Joi.number().positive().required(),
  });
  
  
  module.exports = {
    couponSchema
  };