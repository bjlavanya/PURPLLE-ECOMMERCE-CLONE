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
    phonenumber: {
        type: String,
        default: null
    },
    address: [
        {
            pincode: {
                type: String,
                default: null
            },
            location: {
                type: String,
                default: null
            },
            city: {
                type: String,
                default: null
            },
            state: {
                type: String,
                default: null
            }
        }
    ],
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