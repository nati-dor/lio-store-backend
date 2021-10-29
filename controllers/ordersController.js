const Orders = require('../Models/Order')
const { v4: uuidv4 } = require('uuid');


exports.getAll = async function (req, res, next) {
    try {
        const orders = await Orders.find();
        res.status(200).send(orders)
    } catch (error) {
        res.status(500).send(error.message)
    }
}

exports.findOne = async function (req, res) {
    try {
        const order = await Orders.findOne({
            userId: req.params.id
        }).populate("userId")
        .populate({
            path: "products",
            populate: { path: "productId" },
          });
        res.send(order);
    } catch(err) {
        res.status(404).send(error.message);
    }
}

exports.getByUserId = async function (req, res, next) {
    try {
        const orders = await Orders.find({
            userId: req.body.userId ,
        }).populate({
            path: "products",
            populate: { path: "productId" },
          });
        res.status(200).send(orders)
    } catch (error) {
        res.status(500).send(error.message)
    }
}

exports.create = async function (req, res) {
    const order = new Orders({
        id: uuidv4().split('-')[0],
        userId: req.body.userId,
        products: req.body.products,
        totalPrice: req.body.totalPrice,
        date: new Date(),
        percentageDiscount: req.body.percentageDiscount,
        status: req.body.status
    });
    await order.save();
    res.send(order);
}

exports.update = async function (req, res)  {
    try {
        const order = await Orders.findOne({
            id: req.params.id
        });
        if (req.body.userId) 
        order.userId = req.body.userId;
        if (req.body.products) 
        order.products = req.body.products;
        if (req.body.totalPrice) 
        order.totalPrice = req.body.totalPrice;
        if (req.body.date) 
        order.date = req.body.date;
        if (req.body.percentageDiscount || req.body.percentageDiscount===0 ) 
        order.percentageDiscount = req.body.percentageDiscount;
        if (req.body.status) 
        order.status = req.body.status;
        await order.save();
        res.send(order);
    } catch(error) {
        res.status(404).send(error.message)
        };
}

exports.delete = async function (req, res) {
    try {
        await Orders.deleteOne({
            id: req.params.id
        });
        res.status(204).send();
    } catch {
        res.status(404);
        res.send({
            error: "Order doesn't exist!"
        });
    }
}