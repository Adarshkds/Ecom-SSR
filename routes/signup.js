const express = require('express');
const router = express.Router();

const bcrypt = require('bcrypt');
const User = require('../models/user');

const uservalidator = require('../validators/signup');


// ///////////////////////////////////////////////////// signup
router.get('/products/account/signup', (req, res) => {
    res.render('signup');
})

router.post('/products/account/signup', validator(uservalidator), async (req, res) => {
    // return res.send(req.body);
    const { username, email, password, gridRadios } = req.body;
    const existingUser = await User.findOne({ username });
    if (existingUser) {
        return res.send('User already exists');
    }

    //bcrypt 
    const saltRounds = 5;
    const hashedPass = await bcrypt.hash(password, saltRounds);

    //to save user in db
    const user = await User.create({ username, email, password: hashedPass, gridRadios });
    res.redirect('/products/account/signin');
})


// ///////////////////////////////////////////////////// signin
router.get('/products/account/signin', (req, res) => {
    res.render('signin');
})

router.post('/products/account/signin', async (req, res) => {
    //verify user
    const { username, password } = req.body;

    const existingUser = await User.findOne({ username });
    if (!existingUser) {
        return res.send('Invalid credentials');
    }

    //compare bcrypt password
    const validPass = await bcrypt.compare(password, existingUser.password);
    if (!validPass) {
        return res.send('Invalid credentials');
    }

    //add session
    req.session.user_id = existingUser._id;
    
    res.redirect('/products');
})


// ///////////////////////////////////////////////////// logout
router.get('/products/account/logout', (req, res) => {
    // req.session.user_id = null; //👈 this is not a good way to destroy session so use destroy method 👇
    req.session.destroy();
    res.redirect('/products');
})

module.exports = router;