const Joi = require("joi");
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderSchema = new Schema({
    id: String,
    userId: {
        type: Schema.Types.ObjectId,
        ref: "users",
    },
    totalPrice: Number,
    date: Date,
    products:  [
        {
          productId: {
            type: Schema.Types.ObjectId,
            ref: "products",
          },
          amount: Number,
        },
      ],
    percentageDiscount: Number,
    status: String
})


module.exports =  mongoose.model('orders',orderSchema);