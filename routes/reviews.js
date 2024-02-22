const express = require('express');
const router = express.Router();

const Product = require('../models/product');
const Review = require('../models/reviews');


//to post review
router.post('/products/:id/add', async (req, res) => {
    const { id } = req.params;
    const { comment, rating } = req.body;
    
    if (comment || rating) {
        const review = await Review.create({ comment, rating });
        const product = await Product.findById(id);
        product.reviews.push(review);
        product.save();
    }   
    // res.redirect(`/products/${id}`);
    req.flash('success', 'Review added successfully!!');
    res.redirect('back');
});


//to delete review
router.get('/products/:cmtid/deletecomment/:prodid', async (req, res) => {
    const { cmtid, prodid } = req.params;
    const prod = await Product.findById(prodid);
    const cmt = await Review.findByIdAndDelete(cmtid);

    // const review = prod.reviews;

    // for (let i = 0; i < review.length; i++) {
    //     if (review[i].equals(cmt._id)) {
    //         console.log(`omitted`);
    //         review.splice(i, 1);
    //     }
    // }

    // prod.reviews = review;
        
    // // // // instead we can use filter method 👇
    prod.reviews = prod.reviews.filter(review => !review.equals(cmt._id));
    await prod.save();
    
    req.flash('success', 'Review deleted successfully!!');
    res.redirect(`/products/${prodid}`);
})

module.exports = router;