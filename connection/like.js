var mongoose = require('mongoose');


var connection = mongoose.connection;
var conn = mongoose.connect('mongodb://localhost:27017/Shopnow', {useNewUrlParser: true, useUnifiedTopology: true});


var schema = new mongoose.Schema({
   User:{
       type:String,
       required:true
   },
   Productid:{
       type:String,
       required:true
   },
   Productname:{
    type:String,
    required:true
   },
   Action:{
       type:String,
       required:true
   }
});

var model = mongoose.model('Like',schema);

module.exports=model;