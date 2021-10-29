const Joi = require("joi");
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    id: String,
    name: String,
    email: String,
    roles:String,
    address:String,
    city: String,
    country:String,
    phone:String,
    zip: Number,
})

module.exports =  mongoose.model('users',userSchema);


