const Products = require('../Models/Product')
const { v4: uuidv4 } = require('uuid');

exports.getAll = async function (req, res, next) {
    try {
        const products = await Products.find();
        res.status(200).send(products)
    } catch (error) {
        res.status(500).send(error.message)
    }
}

exports.findOne = async function (req, res) {
    try {
        const product = await Products.findOne({
            id: req.params.id
        });
        res.send(product);
    } catch {
        res.status(404);
        res.send({
            error: "Products doesn't exist!"
        });
    }
}

exports.create = async function (req, res) {
    let isNew,isSale;
    if (!req.body.isNew) 
    isNew = false;
    else isNew = true;
    if (!req.body.isSale) 
    isSale = false;
    else isSale = true;
    const product = new Products({
        id: uuidv4().split('-')[0],
        bigImg: req.body.bigImg,
        title: req.body.title,
        rating: req.body.rating,
        productDetails: req.body.productDetails,
        price: req.body.price,
        oldPrice: req.body.oldPrice,
        reviews:req.body.reviews,
        orders:req.body.orders,
        arrImg:req.body.arrImg,
        isSale: isSale,
        isNew: isNew
    });
    await product.save();
    res.send(product);
}

exports.update = async function (req, res)  {
    try {
        const product = await Products.findOne({
            id: req.params.id
        });
        if (req.body.bigImg) 
        product.bigImg = req.body.bigImg;
        if (req.body.title) 
        product.title = req.body.title;
        if (req.body.rating) 
        product.rating = req.body.rating;
        if (req.body.productDetails) 
        product.productDetails = req.body.productDetails;
        if (req.body.price) 
        product.price = req.body.price;
        if (req.body.oldPrice) 
        product.oldPrice = req.body.oldPrice;
        if (req.body.reviews) 
        product.reviews = req.body.reviews;
        if (req.body.orders) 
        product.orders = req.body.orders;
        if (req.body.arrImg) 
        product.arrImg = req.body.arrImg;
        if (!req.body.isNew) 
        product.isNew = false;
        else product.isNew = true;
        if (!req.body.isSale) 
        product.isSale = false;
        else product.isSale = true;
        await product.save();
        res.send(product);
    } catch {
        res.status(404);
        res.send({
            error: "Comment doesn't exist!"
        });
    }
}

exports.delete = async function (req, res) {
    try {
        await Products.deleteOne({
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