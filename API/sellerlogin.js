const express = require('express');
const app = express();
const bodyparser = require('body-parser');

var conn = require('../connection/connection2');


app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.set('views', './views')


app.get('/Sellerlogin', function (req, res) {
    if (req.session.user) {
        res.redirect('/homepage');
    } else {
        res.render('sellerlogin');
    }
});

app.post('/homepage', function (req, res) {
    var Username = req.body.username;
    var Password = req.body.password;
    conn.findOne({ $and: [{ Username: Username, Password: Password }] }, (err, data1) => {
        if (err) {
            res.json("Invalid Username & Password");
        }
        if (data1) {
            req.session.user = Username;
            res.redirect('/homepage');
        } else {
            res.render('sellerlogin');
        }
    })
});


module.exports = app;