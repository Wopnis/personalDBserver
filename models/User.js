const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userScheme = new Schema({
        date: {
          type: Date,
          default: Date.now
        },
        name: {
            type: String,
            required: true
        },
        surname: {
            type: String,
            required: false
        },
        city: {
            ref: 'cities',
            type: Schema.Types.ObjectId,
            required: false
        },
        company: {
            type: String,
            required: false
        },
        email: {
            type: String,
            unique: true,
            required: true
        },
        password: {
            type: String,
            minlength: 6,
            required: false
        },
        phone: {
            type: String,
            required: false
        },
        role: {
            type: String,
            default: 'user',
            required: false
        },
        id: {
            type: String,
            required: false
        },
        imageSrc: {
            type: String,
            required: false,
            default: ''
        }
    },
    { versionKey: false }
    );

module.exports = mongoose.model('users', userScheme);