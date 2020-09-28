const express = require('express');
const app = express();
const con = require('../connection/address');
const bodyparser = require('body-parser');


app.set('view engine','ejs');
app.set('views','views');
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:true}));


app.get('/shopnow/user/address/:a',function(req,res){
    var a = req.params.a;
    res.render('address.ejs',{index:a});
});

app.post('/address',function(req,res){
    if(req.session.username){
    var address = new con({
        User:req.session.username,
        Fullname:req.body.fullname,
        Emailid:req.body.email,
        Address:req.body.address,
        City:req.body.city,
        MobileNumber:req.body.mobilenumber,
        State:req.body.state,
        Zip:req.body.zip,
        CardName:req.body.cardname,
        CardNumber:req.body.cardnumber,
        ExpMonth:req.body.expmonth,
        ExpYear:req.body.expyear,
        Cvv:req.body.cvv,
        Date:Date.now()
    });
    address.save()
    .then(
        res.redirect('/shopnow/user/order')
    )
    }else{
        res.redirect('/shopnow/user/home')
    }
});

module.exports=app;