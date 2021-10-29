const Users = require('../Models/User')
const { v4: uuidv4 } = require('uuid');

exports.getAll = async function (req, res, next) {
    try {
        const users = await Users.find();
        res.status(200).send(users)
    } catch (error) {
        res.status(500).send(error.message)
    }
}

exports.findOne = async function (req, res) {
    try {
        const user = await Users.findOne({
            id: req.params.id
        });
        res.send(user);
    } catch {
        res.status(404);
        res.send({
            error: "Comment doesn't exist!"
        });
    }
}

exports.create = async function (req, res) {
    const user = new Users({
        id: uuidv4().split('-')[0],
        name: req.body.name,
        email: req.body.email,
        roles:req.body.roles,
        address:req.body.address,
        city: req.body.city,
        country:req.body.country,
        zip: req.body.zip,
        phone:req.body.phone
    });
    await user.save();
    res.send(user);
}

exports.update = async function (req, res)  {
    try {
        const user = await Users.findOne({
            id: req.params.id
        });
        if (req.body.name) 
        user.name = req.body.name;
        if (req.body.email) 
        user.email = req.body.email;
        if (req.body.roles) 
        user.roles = req.body.roles;
        if (req.body.address) 
        user.address = req.body.address;
        if (req.body.city) 
        user.city = req.body.city;
        if (req.body.country) 
        user.country = req.body.country;
        if (req.body.zip) 
        user.zip = req.body.zip;
        if (req.body.phone) 
        user.phone = req.body.phone;

        await user.save();
        res.send(user);
    } catch {
     res.status(404).send(error.message);
    }
}

exports.getByEmail = async function (req, res)  {
    try {
        const user = await Users.findOne({
            email: req.body.email
        });
        res.send(user);
    } catch {
        res.status(404).send(error.message);
    }
}

exports.delete = async function (req, res) {
    try {
        await Users.deleteOne({
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