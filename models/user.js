const { allow } = require('joi');
const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
    },
    gridRadios: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('User', userSchema);