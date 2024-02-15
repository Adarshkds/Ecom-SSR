const mongoose = require('mongoose');

const productSchema = {
    name: {
        type: String,
        required: true,
        trim: true,
    },
    imageLink: {
        type: String,
        default: 'https://t3.ftcdn.net/jpg/02/48/42/64/360_F_248426448_NVKLywWqArG2ADUxDq6QprtIzsF82dMF.jpg'
    },
    price: {
        type: Number,
        min: 0,
        required: true
    },
    colorsAvailable: Array,
    description: String,
    reviews: [{
        type: mongoose.Types.ObjectId,
        ref: 'Review'
    }]
}

const Product = mongoose.model('Product', productSchema);

module.exports = Product;