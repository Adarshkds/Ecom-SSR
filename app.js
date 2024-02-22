// ///////////////////////////////////////////////////// express
const express = require('express');
const app = express();
const port = 3000;


// ///////////////////////////////////////////////////// session
const session = require('express-session')
const flash = require('connect-flash');

app.use(session({
    secret: 'password',
    saveUninitialized: true,
    resave: true
}));

app.use(flash());

app.use((req, res, next) => {
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    next();
})


// ///////////////////////////////////////////////////// mongoose
const mongoose = require('mongoose');
// mongoose.connect('mongodb+srv://Adarsh:L%40v31twh3n1thapp3n5@cluster0.nchzaqb.mongodb.net/Ecom', {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
// })
mongoose.connect('mongodb://127.0.0.1:27017/E-Com')
    .then(() => console.log(`Connection Established`))
    .catch(err => console.log(err));

const Product = require('./models/product');


// ///////////////////////////////////////////////////// to parse data that is received from form with post request 
app.use(express.urlencoded({ extended: true }));


// ///////////////////////////////////////////////////// bcrypt for password hashing
const bcrypt = require('bcrypt');


// ///////////////////////////////////////////////////// setting path, ejs and views
const path = require('path');
const ejs = require('ejs');
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


// ///////////////////////////////////////////////////// setting ejs mate to link boiler plate and other partials 
const ejsMate = require('ejs-mate');
app.engine('ejs', ejsMate);


// ///////////////////////////////////////////////////// Routes
const productRoutes = require('./routes/product');
const reviewRoutes = require('./routes/reviews');
const signUp = require('./routes/signup');

app.use(productRoutes);
app.use(reviewRoutes);
app.use(signUp);


// ///////////////////////////////////////////////////// to use public folder
app.use(express.static(path.join(__dirname, 'public')));


// ///////////////////////////////////////////////////// to override method i.e. using put, patch, delete
const methodOverride = require('method-override');
app.use(methodOverride('_method'));


// ///////////////////////////////////////////////////// universal route
app.get('*', (req, res) => {
    res.status(404).send('Not Found');
});

// ///////////////////////////////////////////////////// Port running
app.listen(port, () => {
    console.log(`Port on ${port}`);
})



