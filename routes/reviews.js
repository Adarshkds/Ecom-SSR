const express = require('express');
const router = express.Router();

const Product = require('../models/product');
const Review = require('../models/reviews');

router.post('/products/:id/add', async (req, res) => {
    const { id } = req.params;
    const { comment, rating } = req.body;
    
    if (comment || rating) {
        const review = await Review.create({ comment, rating });
        const product = await Product.findById(id);
        product.reviews.push(review);
        product.save();
    }   
    res.redirect('back');
});

module.exports = router;