const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    username: {
        type: String, 
        default: 'Guest'
    },
    email: {
        type: String,
        required: true,
        trim: true
    },
    otp: {
        type: String,
    },
    otpExpiry: {
        type: Date,
        default: Date.now
    },
    isVerified: {
        type: Boolean,
        default: false
    }
});

const User = mongoose.model('users', UserSchema)
module.exports = User