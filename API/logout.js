const express = require('express')
const app = express();

app.get('/shopnow/user/logout',function(req,res){
    req.session.destroy();
    res.redirect('/shopnow/user/login-page');
});

module.exports=app;