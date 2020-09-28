const express = require('express');
const app = express();


app.set('view engine','ejs');
app.set('views','./views');


app.get('/log-me-out',function(req,res){
    req.session.destroy();
    res.render('sellerlogin');
});

module.exports = app;