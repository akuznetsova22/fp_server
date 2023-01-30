const express = require('express');
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');

const userRoutes = require('./routes/routesUser');
const wishlistRoutes = require('./routes/routesWishlist');
const shoppingCartRoutes = require('./routes/routesShoppingCart');
const productsRoutes = require('./routes/routesProducts');

app.use(express.json());
app.use(cors({
    origin:['http://localhost:3000'],
    methods:['GET','POST'],
    credentials: true
}));
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended: true}));
app.use(session({
    key:'userLoggedIn',
    secret:'secretMessage',
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000*60*60,
    }
}))

app.use('/user',userRoutes);
app.use('/wishlist', wishlistRoutes);
app.use('/shoppingcart',shoppingCartRoutes);
app.use('/products',productsRoutes);


app.listen(3001,() => {
    console.log('running server');
})