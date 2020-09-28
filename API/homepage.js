const express = require('express');
const app = express();
const conn = require('../connection/connection2cate');


app.set('view engine','ejs');
app.set('views','./views');
app.use(express.static(__dirname+'/Images'));


app.get('/homepage',function(req,res){
    if(req.session.user){
        conn.find({Seller:req.session.user},function(err,data3){
            if(err){
                res.json('err');
            }
            if(data3){
            res.render('homepage',{records:data3,username:req.session.user,msg:''});
            }
        });
    }else{
        res.redirect('sellerlogin');
    }
});

app.get('/deletecat/:id',function(req,res){
    var id = req.params.id;
    conn.findByIdAndRemove(id)
    .exec()
    .then(
        res.redirect('/homepage')
    )
});


app.post('/searchproduct',function(req,res){
    var search = req.body.user;
    if(search!=''){
        var product = {Product:search,Seller:req.session.user};
    }else{
        var product = {Seller:req.session.user}; 
    }
    conn.find(product,function(err,data4){
        if(err){
            res.json("Error In Search");
        }
        if(data4){
            res.render('homepage',{records:data4,username:req.session.user,msg:''});
        }
    });
});

app.get('/auto/',function(req,res,next){
    if(req.session.user){
	var regex = new RegExp(req.query["term"],'i');
	var find = conn.find({Product:regex,Seller:req.session.user},{'Product':1}).sort({"updated_at":-1}).sort({"created_at":-1}).limit(20);
    find.exec(function(err,data){
	var result=[];
	if(!err){
		if(data && data.length && data.length>0){
		data.forEach(categori=>{
			let obj = {
				id:categori._id,
				label:categori.Product
			};
			result.push(obj);
		});
	}
	res.jsonp(result);
	}
	});
}else{

}
});


module.exports=app;