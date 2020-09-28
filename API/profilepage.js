const express = require('express');
const app = express();
const conn = require('../connection/connection2');


app.set('view engine','ejs')
app.set('views','./views')


app.post('/profilepage',function(req,res){
    if(req.session.user){
        var Username = req.body.username;
        var Fullname = req.body.fullname;
        var Emailid = req.body.emailid;
        var Xender = req.body.xender;
        var Qualification = req.body.qulification;
        var Password = req.body.password;
        conn.findOneAndUpdate(Username,{Fullname,Username,Emailid,Xender,Qualification,Password})
        .exec()
        .then(
            res.redirect('/profilepage')
        )
        }
    else{
        res.redirect('sellerlogin');
    }
    });

app.get('/profilepage',function(req,res){
    if(req.session.user){
        conn.findOne({Username:req.session.user},function(err,data1){
            if(err){
                req.status(404).json({
                    Error:"Error in Fetch Data"
                })
            }
            if(data1){
            res.render('profilepage',{username:req.session.user,msg:'',fullname:data1.Fullname,username:data1.Username,emailid:data1.Emailid,xender:data1.Xender,qualification:data1.Qualification,password:data1.Password,msgg:''});
            }
        })
    }
    else{
                res.render('profilepage',{msg:'To Shopnow',username:'',fullname:'',emailid:'',xender:'',qualification:'',password:'',msgg:'You Are not Login'});
            }
        })

module.exports = app;