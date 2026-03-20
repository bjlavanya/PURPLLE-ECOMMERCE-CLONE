const mongoose = require('mongoose')

const OrderSchema = new mongoose.Schema({
    userEmail: {
        type: String
    },

    products: [
        {
            productId: String,
            productImage: String,
            productName: String,
            newPrice: Number,
            quantity: Number
        }
    ],

    totalAmount: {
        type: Number
    },

    orderStatus: {
        type: String,
        default: 'Pending'
    },

    orderDate: {
        type: Date,
        default: Date.now
    }
});

const Order = mongoose.model('orders', OrderSchema)
module.exports = Order