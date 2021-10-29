const Joi = require("joi");
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const couponSchema = new Schema({
    id: String,
    name: String,
    discount: Number
});


module.exports =  mongoose.model('coupons',couponSchema);