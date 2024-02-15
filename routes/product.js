const express = require('express');
const router = express.Router();


const Product = require('../models/product');
const validator = require('../middlewares/validators')
const productSchema = require('../validators/productSchema');


//home
router.get('/', (req, res) => {
    res.send('Working Fine!!!');
})


//home products
router.get('/products', async (req, res) => {
    const products = await Product.find({});
    res.render('home', { products });
})


//to add new products
router.get('/products/new', (req, res) => {
    res.render('new');
})

router.post('/products/new', validator(productSchema), async (req, res) => {
    const { name, price, description, imageLink, colors } = req.body;
    colorsAvailable = colors.split(',').slice(0, 4);
    console.log(colorsAvailable);

    await Product.create({ name, price, description, imageLink, colorsAvailable });

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

    console.log('3');
    await existingProd.save();

    res.redirect(`/products/${id}`);
});


//to delete product
router.get('/products/:id/delete', async (req, res) => {
    const { id } = req.params;
    await Product.findByIdAndDelete(id);
    res.redirect('/products');
})






module.exports = router;