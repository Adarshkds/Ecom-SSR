// express
const express = require('express');
const app = express();
const port = 3000;


// mongoose
const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/E-Com')
    .then(() => console.log(`Connection Established`))
    .catch(err => console.log(err));

const Product = require('./models/product');

// setting path, ejs and views
const path = require('path');
const ejs = require('ejs');
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// setting ejs mate to link boiler plate and other partials 
const ejsMate = require('ejs-mate');
app.engine('ejs', ejsMate);

// to use public folder
app.use(express.static(path.join(__dirname, 'public')));

// to override method
const methodOverride = require('method-override'); 
app.use(methodOverride('_method'));

// to parse data that is received from form with post request
app.use(express.urlencoded({ extended: true }));

// Routes
const productRoutes = require('./routes/product');
const reviewRoutes = require('./routes/reviews');

app.use(productRoutes);
app.use(reviewRoutes);

// universal route
app.get('*', (req, res) => {
    res.status(404).send('Not Found');
});

// Port running
app.listen(port, () => {
    console.log(`Port on ${port}`);
})

