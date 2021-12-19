const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    name: {
        type: String,
        // required: true,
    },
    phone: {
        type: String,
        required: true,
        // unique: true,
    },
    state: {
        type: String,
        // required: true,
    },
}, { collection: 'users' });

const Model = mongoose.model('User', schema, 'users');

module.exports = Model;