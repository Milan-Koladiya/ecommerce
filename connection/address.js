var mongoose = require('mongoose');

var conn = mongoose.connection;
var connection = mongoose.connect('mongodb://localhost:27017/Shopnow', {useNewUrlParser: true, useUnifiedTopology: true});

var schema = new mongoose.Schema({
    User:{
        type:String,
        required:true
    },
    Fullname:{
        type:String,
        required:true
    },
    Emailid:{
        type:String,
        required:true
    },
    Address:{
        type:String,
        required:true
    },
    City:{
        type:String,
        required:true
    },
    MobileNumber:{
        type:String,
        required:true
    },
    State:{
        type:String,
        required:true
    },
    Zip:{
        type:String,
        required:true
    },
    CardName:{
        type:String,
        required:true
    },
    CardNumber:{
        type:String,
        required:true
    },
    ExpMonth:{
        type:String,
        required:true
    },
    ExpYear:{
        type:String,
        required:true
    },
    Cvv:{
        type:String,
        required:true
    },
    Date:{
        type:Date,
        default:Date.now()
    }
});

var Model = mongoose.model('address',schema);

module.exports=Model;