const express = require('express');
const app = express();
const session = require('express-session');
const conn = require('../connection/connection2cate');
const connection = require('../connection/review');
const Model = require('../connection/like');
const bodyparser = require('body-parser');
const { Connection } = require('mongoose');


app.set('view engine', 'ejs');
app.set('views', './views');
app.use(session({ secret: 'abcdefghijklmopq', resave: false, saveUninitialized: true, }));
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));
app.use(express.static(__dirname + './Uploads'));


app.get('/shopnow/user/detail/:id', function (req, res) {
    var id = req.params.id;
    conn.find({ _id: id }, function (err, data8) {
        if (err) {
            res.json("Error In Fetched Data");
        }
        if (data8) {
            connection.find({ ProductId: id })
                .exec(function (err, data) {
                    Model.find({ Productid: id, Action: 'Like' }).count()
                        .exec()
                        .then(data7 => {
                            Model.findOne({ Productid: id, Action: 'DisLike' }).count()
                                .exec()
                                .then(data9 => {
                                    connection.findOne({ ProductId: id }).count()
                                        .exec()
                                        .then(data6 => {
                                            res.render('detail', { detail: data8[0], username: req.session.username, review: data, like: data7, dislike: data9, treview: data6 });
                                        })
                                })
                        })
                })
        }
    });
});

app.post('/shopnow/user/review/:id', function (req, res) {
    if (req.session.username) {
        var id = req.params.id;
        var review = req.body.description;
        var user = req.session.username;
        connection.findOne({ User: user, ProductId: id }, function (err, data) {
            if (data) {
                //This is the main redirection beacause its redirect with id
                res.redirect('/shopnow/user/detail/' + id);
            } else {
                var Review = new connection({
                    ProductId: id, User: user, Review: review, Date: Date.now()
                });
                Review.save(function (err, data) {
                    res.redirect('/shopnow/user/detail/' + id);
                })
            }
        });
    } else {
        var id = req.params.id;
        res.redirect('/shopnow/user/detail/' + id);
    }
});


app.get('/like/:id/:name', function (req, res) {
    var id = req.params.id;
    var Product = req.params.name;
    var username = req.session.username;
    var action = 'DisLike';
    var like = Model.findOne({ $and: [{ Productid: id, User: username, Action: action }] })
    like.exec()
        .then(doc => {
            if (doc) {
                Model.findOneAndUpdate({ $and: [{ Productid: id, User: username, Action: action }] }, { Action: 'Like' }).exec()
                res.redirect('/shopnow/user/detail/' + id)
            } else {
                var like = Model.findOne({ $and: [{ Productid: id, User: username, Action: 'Like' }] })
                like.exec()
                    .then(data => {
                        if (data) {
                            res.redirect('/shopnow/user/detail/' + id)
                        } else {
                            var product = new Model({
                                User: username,
                                Productid: id,
                                Productname: Product,
                                Action: 'Like'
                            })
                            product.save()
                                .then(
                                    res.redirect('/shopnow/user/detail/' + id)
                                )
                        }
                    })
            }
        })
});

app.get('/dislike/:id/:name', function (req, res) {
    var id = req.params.id;
    var Product = req.params.name;
    var username = req.session.username;
    var action = 'Like';
    var like = Model.findOne({ $and: [{ Productid: id, User: username, Action: action }] })
    like.exec()
        .then(doc => {
            if (doc) {
                Model.findOneAndUpdate({ $and: [{ Productid: id, User: username, Action: action }] }, { Action: 'DisLike' })
                    .exec()
                res.redirect('/shopnow/user/detail/' + id)
            } else {
                var like = Model.findOne({ $and: [{ Productid: id, User: username, Action: 'DisLike' }] })
                like.exec()
                    .then(data => {
                        if (data) {
                            res.redirect('/shopnow/user/detail/' + id)
                        } else {
                            var product = new Model({
                                User: username,
                                Productid: id,
                                Productname: Product,
                                Action: 'DisLike'
                            })
                            product.save()
                                .then(
                                    res.redirect('/shopnow/user/detail/' + id)
                                )
                        }
                    })
            }
        })
});

app.post('/shopnow/user/addtocart', function (req, res) {
    var id = req.body.id;
    var qty = req.body.qty;
    if (req.session.username) {
        if (req.session.productcart) {
            var currentno = req.session.counter + 1;
            req.session.productcart[currentno] = id;
            req.session.qtycart[currentno] = qty;
            req.session.counter = currentno;
            res.redirect('/shopnow/user/cart')
        } else {
            req.session.productcart = Array();
            req.session.qtycart = Array();
            req.session.productcart[0] = id;
            req.session.qtycart[0] = qty;
            req.session.counter = 0;
            res.redirect('/shopnow/user/cart');
        }
    } else {
        res.redirect('/shopnow/user/home');
    }
});

module.exports = app;