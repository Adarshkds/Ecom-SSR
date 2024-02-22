const express = require('express');
const router = express.Router();

const Product = require('../models/product');
const validator = require('../middlewares/validators')
const productSchema = require('../validators/productSchema');
const Review = require('../models/reviews');
const User = require('../models/user');

//home
router.get('/', (req, res) => {
    res.redirect('/products/account/signin');
})


//home products
router.get('/products', async (req, res) => {
    const products = await Product.find({});

    const id = req.session.user_id;
    const userId = await User.findById(id);

    res.render('home', { products, userId });
})


//to add new products
router.get('/products/new', async (req, res) => {
    if (!req.session.user_id) {
        // return res.send('You are not authorized to add products');
        return res.redirect('/products/account/signin');
    }

    const id = req.session.user_id;
    const userId = await User.findById(id);
    if(userId.gridRadios === 'admin'){
        res.render('new');
    }else{
        // res.send('You are not authorized to add products')
        res.redirect('/products/account');
    }
})

router.post('/products/new', validator(productSchema), async (req, res) => {
    const { name, price, description, imageLink, colors } = req.body;
    colorsAvailable = colors.split(',').slice(0, 4);
    // console.log(colorsAvailable);

    await Product.create({ name, price, description, imageLink, colorsAvailable });
    req.flash('success', 'Product added successfully!!');

    res.redirect('/products');
})


//show single product 
router.get('/products/:id', async (req, res) => {
    const { id } = req.params;
    const product = await Product.findById(id).populate('reviews');
    let totalStars = 0;
    for (let review of product.reviews) {
        totalStars += review.rating;
    }
    res.render('product', { product, totalStars });
})


//to edit product
router.get('/products/:id/edit', async (req, res) => {
    const { id } = req.params;
    const product = await Product.findById(id);
    res.render('edit', { product });
});

router.put('/products/:id/edit', async (req, res) => {
    const { id } = req.params;
    const { name, price, description, imageLink } = req.body;
    const existingProd = await Product.findById(id);

    if (name) existingProd.name = name;
    if (price) existingProd.price = price;
    if (description) existingProd.description = description;
    if (imageLink) existingProd.imageLink = imageLink;

    await existingProd.save();

    res.redirect(`/products/${id}`);
});


//to delete product
router.get('/products/:id/delete', async (req, res) => {
    const { id } = req.params;
    const prod = await Product.findById(id);
    const reviews = prod.reviews;

    for (let review of reviews) {
        await Review.findByIdAndDelete(review);
    }
    await Product.findByIdAndDelete(id);

    req.flash('success', 'Product deleted successfully!!')
    res.redirect('/products');
})









module.exports = router;