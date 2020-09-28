var mongoose = require('mongoose');


var conn = mongoose.connection;
var connection = mongoose.connect('mongodb://localhost:27017/Shopnow', {useNewUrlParser: true, useUnifiedTopology: true});
//here we will make new object that reasone why we use new keyword
var userschema = new mongoose.Schema({
    Fullname:{
        type:String,
    },
    Username:{
        type:String,
    },
    Emailid:{
        type:String,
       
    },
    Xender:{
        type:String,
        
    },
    Qualification:{
        type:String,
       
    },
    Password:{
        type:String,
       
    },
    Date:{
        type:Date,
        default: Date.now
    }
});

    var Model = mongoose.model('seller',userschema);

    module.exports=Model;