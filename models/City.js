const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cityScheme = new Schema ({
    name: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    }
},
    { versionKey: false });

module.exports = mongoose.model('cities', cityScheme);