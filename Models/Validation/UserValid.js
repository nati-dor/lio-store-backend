const Joi = require("joi");

const userSchema = Joi.object({
    _id: Joi.string(),
    __v: Joi.number(),
    id: Joi.string().min(2).max(12),
    name: Joi.string().min(2).max(30),
    email: Joi.string().email(),
    roles: Joi.string().min(2).max(12),
    address: Joi.string().min(2).max(30),
    city: Joi.string().min(2).max(30),
    country: Joi.string().min(2).max(30),
    zip: Joi.number().min(4).max(15),
    phone:Joi.string().min(9).max(15),
  });
  

  module.exports = {
    userSchema
  };