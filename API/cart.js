const express = require('express');
const app = express();
const conn = require('../connection/connection2cate');


app.set('view engine','ejs');
app.set('views','views');
app.use(express.static(__dirname+'./Images')); 


app.get('/shopnow/user/cart',function(req,res){
    if(req.session.username){
        if(req.session.productcart){
            // console.log(req.session);
            console.log(req.session.productcart);
                conn.find({_id:req.session.productcart})
                .exec()
                .then(data=>{
                    var a = req.session.qtycart;
                    console.log(req.session.qtycart);
                    // console.log(data);
                    res.render('cart',{username:req.session.username,msgg:'',msg:'',record:data,qty:a});
                });
        }else{
            res.render('cart',{username:req.session.username,msgg:'',msg:'',record:'',qty:''})
        }
    }else{
        res.render('cart',{msgg:"a",username:'',msg:"To Shopnow",record:'',qty:''});
    }
});

app.get('/remove/:id',function(req,res){
    var product = req.session.productcart;
    var id = req.params.id;
    delete req.session.productcart;
    // delete req.session.qtycart[id];
    res.redirect('/shopnow/user/cart');
});

module.exports=app;