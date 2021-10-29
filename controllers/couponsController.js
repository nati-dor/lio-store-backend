const Coupons = require('../Models/Coupon')
const { v4: uuidv4 } = require('uuid');

exports.getAll = async function (req, res, next) {
    try {
        const coupons = await Coupons.find();
        res.status(200).send(coupons)
    } catch (error) {
        res.status(500).send(error.message)
    }
}

exports.findOne = async function (req, res) {
    try {
        const coupon = await Coupons.findOne({
            name: req.body.name
        });
        res.send(coupon);
    } catch {
        res.status(404);
        res.send({
            error: "Coupon doesn't exist!"
        });
    }
}

exports.create = async function (req, res) {
    const coupon = new Coupons({
        id: uuidv4().split('-')[0],
        name: req.body.name,
        discount: req.body.discount
    });
    await coupon.save();
    res.send(coupon);
}

exports.update = async function (req, res)  {
    try {
        const coupon = await Coupons.findOne({
            id: req.params.id
        });
        if (req.body.name) 
        coupon.name = req.body.name;
        if (req.body.discount)
        coupon.discount = req.body.discount;

        await coupon.save();
        res.send(coupon);
    } catch {
        res.status(404);
        res.send({
            error: "Comment doesn't exist!"
        });
    }
}

exports.delete = async function (req, res) {
    try {
        await Coupons.deleteOne({
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