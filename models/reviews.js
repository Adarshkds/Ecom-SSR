const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    rating: {
        type: Number,
        max: 5,
    },
    comment: {
        type: String,
        trim:true
    }
});

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;