const express = require('express');
const app = express();


app.set('view engine','ejs')
app.set('views','views')


app.get('/shopnow/user/order',function(req,res){
    if(req.session.username){
        res.render('order',{username:req.session.username,msg:'',msgg:''});
    }else{
        res.render('logout');
    }
    
});

module.exports=app;