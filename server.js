const express = require('express');
const app = express();
const session = require('express-session');
app.use(session({secret:'abcdefghijklmopq',resave: false,saveUninitialized: true,}));


//User Api
const resiter = require('./API/resiter');
const login = require('./API/login');
const home = require('./API/home');
const submenu = require('./API/submenu');
const detail = require('./API/detail');
const cart = require('./API/cart');
const order = require('./API/order');
const address = require('./API/address');
const profile = require('./API/profile');
const logout = require('./API/logout');
//Seller API
const sellerresiter = require('./API/sellerresiter');
const sellerlogin = require('./API/sellerlogin');
const homepage = require('./API/homepage');
const logout2 = require('./API/logout2');
const profilepage = require('./API/profilepage');
const addcategory = require('./API/addcategory');


//user 
app.use(resiter);
app.use(login);
app.use(home);
app.use(submenu);
app.use(detail);
app.use(cart);
app.use(order);
app.use(address);
app.use(profile);
app.use(logout);
//Seller
app.use(sellerresiter);
app.use(sellerlogin);
app.use(homepage);
app.use(logout2);
app.use(profilepage);
app.use(addcategory);


app.listen(100);