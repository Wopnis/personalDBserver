const City = require('../models/City');
const User = require('../models/User');
const errorHandler = require('../utils/errorHandler');

module.exports.getByCityId = async function (req,res) {
    try {
       const cities = await City.find({
           city: req.params.cityId,
           user: req.user.id
       });
        res.status(200).json(cities);
    } catch (e) {
        errorHandler(res, e)
    }
};

module.exports.create = async function (req,res) {
    try {
        const city = await new City ({
            name: req.body.name,
            country: req.body.country,
            user: req.user.id
        }).save();
        res.status(201).json(city)
    } catch (e) {
        errorHandler(res, e)
    }
};

module.exports.remove = async function (req,res) {
    try {
        await City.remove({_id: req.params.id});
        await User.remove({city: req.params.id});
        res.status(200).json({
            message: 'Адрес был удален.'
        })
    } catch (e) {
        errorHandler(res, e)
    }
};

module.exports.update = async function (req,res) {
    try {
        const city = await  City.findOneAndUpdate(
            {_id:req.params.id},
            {$set: req.body},
            {new: true}
            );
        res.status(200).json(city)
    } catch (e) {
        errorHandler(res, e)
    }
};
