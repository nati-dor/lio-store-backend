const Joi = require("joi");
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = new Schema({
    id: String,
    userId: {
        type: Schema.Types.ObjectId,
        ref: "users",
    },
    title: String,
    body:String,
    comments:  [
        {
            commentId: {
            type: Schema.Types.ObjectId,
            ref: "comments",
          }
        },
      ],
})

 
module.exports =  mongoose.model('posts',postSchema);