const Joi = require("joi");
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
    id: String,
    bigImg: String,
    title: String,
    rating: Number,
    productDetails: String,
    price: Number,
    oldPrice: Number,
    reviews:Number,
    orders:Number,
    isSale:Boolean,
    arrImg:Array,
    isNew: Boolean
})

module.exports =  mongoose.model('products',productSchema);
