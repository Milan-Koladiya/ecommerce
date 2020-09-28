const express = require('express');
const app = express();
var bodyParser = require('body-parser');

const Model = require('../connection/connection');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs')
app.set('views', './views')


app.get('/shopnow/user/resiter-page', function (req, res) {
    res.render('resiter');
});

app.post('/shopnow/user/login-page', function (req, res) {
    var password = req.body.password;
    var cpassword = req.body.cpassword;
    if (password !== cpassword) {
        res.redirect('/shopnow/user/resiter-page');
    } else {
        var user = new Model({
            Fullname: req.body.fullname,
            Username: req.body.username,
            Emailid: req.body.emailid,
            Xender: req.body.xender,
            Qualification: req.body.qulification,
            Password: req.body.password,
            Date: Date.now()
        });
        user.save(function (err, data) {
            if (err) {
                res.status(404).json({
                    error: "Error in submit data"
                })
            } else {
                res.render('login', { message: "msg", msgg: "", msg: "" });
            }
        });
    }
});

module.exports = app;
