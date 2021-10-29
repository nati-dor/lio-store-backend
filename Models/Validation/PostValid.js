const Joi = require("joi");

const postSchema = Joi.object({
    _id: Joi.string(),
    __v: Joi.number(),
    id: Joi.string().min(2).max(12),
    userId: Joi.any(),
    title: Joi.string().min(2).max(100).required(),
    body: Joi.string().min(2).max(1000).required(),
    comments:Joi.any()
  });
  

  module.exports = {
    postSchema
  };