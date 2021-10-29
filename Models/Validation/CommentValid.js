const Joi = require("joi");

const commentSchema = Joi.object({
    _id: Joi.string(),
    __v: Joi.number(),
    id: Joi.string().min(2).max(12),
    email: Joi.string().email().min(2).max(100).required(),
    body: Joi.string().min(2).max(1000).required(),
    userId: Joi.any(),
  });
  
  
  module.exports = {
    commentSchema
  };