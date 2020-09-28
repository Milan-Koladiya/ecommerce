const express = require('express');
const app = express();
const bodyparser = require('body-parser');
const Model = require('../connection/connection');


app.set('view engine','ejs')
app.set('views','./views')
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:true}));


app.post('/shopnow/user/profile',function(req,res){
    if(req.session.username){
        var Username=req.body.username;
        var Fullname=req.body.fullname;
        var Emailid=req.body.emailid;
        var Xender=req.body.xender;
        var Qualification=req.body.qulification;
        var Password=req.body.password;
        Model.findOneAndUpdate({Username},{Fullname,Username,Emailid,Xender,Qualification,Password})
        .exec()
        .then(
            res.redirect('/shopnow/user/profile')
        )
    }else{
        res.redirect('/shopnow/user/profile');
    }
});


app.get('/shopnow/user/profile',function(req,res){
    if(req.session.username){
        Model.findOne({Username:req.session.username},function(err,data){
        res.render('profile',{username:req.session.username,fullname:data.Fullname,username:data.Username,emailid:data.Emailid
        ,xender:data.Xender,qualification:data.Qualification,password:data.Password,msgg:''});
        })
    }
    else{
        res.render('profile',{msg:'To Shopnow',username:"",username:'',fullname:'',username:'',emailid:''
        ,xender:'',qualification:'',password:'',msgg:'You are not Login'});
    }
});


module.exports=app;