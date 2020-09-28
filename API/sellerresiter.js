const express = require('express');
const app = express();
var bodyParser = require('body-parser');


const conn = require('../connection/connection2');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.set('view engine','ejs')
app.set('views','./views')


app.get('/sellerresiter',function(req,res){
    res.render('sellerresiter');
});

app.post('/sellerlogin',function(req,res){
    var password=req.body.password;
    var cpassword=req.body.cpassword;
    if(password!==cpassword){
        res.render('resiter');
    }else{
        var user = new conn({
            Fullname:req.body.fullname,
            Username:req.body.username,
            Emailid:req.body.emailid,
            Xender:req.body.xender,
            Qualification:req.body.qulification,
            Password:req.body.password,
            Date:Date.now()});
            user.save(function(err,data){
                if(err){
                    res.status(404).json({
                        error:"Error in submit data"
                    })
                }else{
                    res.render('sellerlogin');
                }
            });
    }
});


module.exports=app;