const mongoose = require('mongoose')

const ProductsSchema = new mongoose.Schema({
    productImage: {
        type: String,
        required: true,
    },

    productName: {
        type: String,
    },

    productDescription: {
        type: String
    },

    newPrice: {
        type: Number,
    },

    oldPrice: {
        type: Number,
    }, 

    discount: {
        type: Number,
    },

    productQuantity: {
        type: Number,
    },

    highlights: {
        type: String,
    },

    category: {
        type: String,
    }
});

const Products = mongoose.model('products', ProductsSchema)
module.exports = Products