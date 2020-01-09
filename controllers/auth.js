const bcrypt = require('bcryptjs');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const config = require('../config/keys');
const errorHandler = require('../utils/errorHandler');


module.exports.login = async function (req,res) {
    const candidate = await User.findOne({email: req.body.email});
    if (candidate) {
        // check password
        const passwordResult = bcrypt.compareSync(req.body.password, candidate.password);
        if (passwordResult) {
            // token
            const token = jwt.sign({
                email: candidate.email,
                userId: candidate._id,
            }, config.jwt, {expiresIn: 60*60});

            res.status(200).json({
                token: `Bearer ${token}`
            })
        } else {
            // Пароли не совпадают
            res.status(401).json({
                message: 'Пароли не совпадают. Попробуйте снова.'
            })
        }
    } else {
        // user not found, error
        res.status(404).json({
            message: 'Такого пользователя не существует, пройдите процедуру регистрации'
        })
    }
};


module.exports.register = async function (req,res) {
    const candidate = await User.findOne({email: req.body.email});

    if (candidate) {
        res.status(409).json({
            message: 'Такой E-mail уже занят. Попробуйте использовать другой.'
        })
    } else {
        const salt = bcrypt.genSaltSync(10);
        const password = req.body.password;
        const user = new User ({
            name: req.body.name,
            surname: req.body.surname,
            email: req.body.email,
            password: bcrypt.hashSync(password, salt),
            role: req.body.role
        });
        try {
            await user.save();
            res.status(201).json(user)
        } catch (e) {
            // error have to send
            errorHandler(res, e)
        }
    }
};
