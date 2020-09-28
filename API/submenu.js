const express = require('express');
const app = require('./resiter');
const conn = require('../connection/connection2cate');


app.set('view engine','ejs');
app.set('views','views');


app.get('/shopnow/user/electronic',function(req,res){
    conn.find({Category:'Electronics'})
    .exec()
    .then(data=>{
        if(req.session.username){
        res.render('electronics',{records:data,username:req.session.username,msg:''});
        }else{
            res.render('electronics',{records:data,username:'',msg:'To Shopnow'});
        }
    })
});

app.get('/shopnow/user/men-women-fashion',function(req,res){
    conn.find({Category:'Men,Women Fashion'})
    .exec()
    .then(data=>{
        if(req.session.username){
        res.render('electronics',{records:data,username:req.session.username,msg:''});
        }else{
            res.render('electronics',{records:data,username:'',msg:'To Shopnow'});
        }
    })
});

app.get('/shopnow/user/beauty-health-grocery',function(req,res){
    conn.find({Category:'Beauty,Health,Grocery'})
    .exec()
    .then(data=>{
        if(req.session.username){
        res.render('electronics',{records:data,username:req.session.username,msg:''});
        }else{
            res.render('electronics',{records:data,username:'',msg:'To Shopnow'});
        }
    })
});

app.get('/shopnow/user/sports-fitness',function(req,res){
    conn.find({Category:'Sports,Fitness'})
    .exec()
    .then(data=>{
        if(req.session.username){
        res.render('electronics',{records:data,username:req.session.username,msg:''});
        }else{
            res.render('electronics',{records:data,username:'',msg:'To Shopnow'});
        }
    })
});

app.get('/shopnow/user/toy-babyproduct-kidsfashion',function(req,res){
    conn.find({Category:'Toy,Baby Product,Kid s Fashion'})
    .exec()
    .then(data=>{
        if(req.session.username){
        res.render('electronics',{records:data,username:req.session.username,msg:''});
        }else{
            res.render('electronics',{records:data,username:'',msg:'To Shopnow'});
        }
    })
});

app.get('/shopnow/user/car-motorBike-industriyal',function(req,res){
    conn.find({Category:'Toy,Baby Product,Kid s Fashion'})
    .exec()
    .then(data=>{
        if(req.session.username){
        res.render('electronics',{records:data,username:req.session.username,msg:''});
        }else{
            res.render('electronics',{records:data,username:'',msg:'To Shopnow'});
        }
    })
});

module.exports=app;