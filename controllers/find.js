const User = require('../models/User');
const bcrypt = require('bcryptjs');
const errorHandler = require('../utils/errorHandler');

module.exports.getAll = async function (req,res) {
    try {
        const users = await User.find({});
        res.status(200).json(users)
    } catch (e) {
        errorHandler(res, e)
    }
};

module.exports.getById = async function (req,res) {
    try {
        const user = await User.findById(req.params.id);
        res.status(200).json(user)
    } catch (e) {
        errorHandler(res, e)
    }
};

module.exports.remove = async function (req,res) {
    try {
        await User.remove({_id: req.params.id});
        res.status(200).json({
            message: 'Пользователь удален'
        })
    } catch (e) {
        errorHandler(res, e)
    }
};

module.exports.create = async function (req,res) {
    const salt = bcrypt.genSaltSync(10);
    const password = req.body.password;
    const user = new User ({
        name: req.body.name,
        department: req.body.department,
        email: req.body.email,
        password: bcrypt.hashSync(password, salt),
        imageSrc: req.file ? req.file.path : ''
    });
    try {
        await user.save();
        res.status(201).json(user);
    } catch (e) {
        errorHandler(res, e)
    }
};

module.exports.update = async function (req,res) {
    try {
        const user = await User.findOneAndUpdate(
            {_id: req.params.id},
            req.body,
            {new: true}
        );
        res.status(200).json(user);
    } catch (e) {
        errorHandler(res, e)
    }
};
