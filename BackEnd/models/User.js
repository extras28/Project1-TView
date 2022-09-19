const mongoose = require('mongoose');

const User = new mongoose.Schema({
    username: {
        type: String,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
    gender: String,
    address: String,
    phone: String,
    dob: String,
    avatar: String,
    accessToken: String,
    expirationDateToken: Date,
    resetPasswordToken: String,
    expirationDateResetPasswordToken: String,
});


module.exports = mongoose.model('User', User);