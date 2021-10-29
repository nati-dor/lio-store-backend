const Joi = require("joi");
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = new Schema({
    id: String,
    email:String,
    body:String,
    userId: {
        type: Schema.Types.ObjectId,
        ref: "users",
    }
})


module.exports =  mongoose.model('comments',commentSchema);