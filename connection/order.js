const mongoose = require('mongoose');

var conn = mongoose.connect();
var connection = mongoose.connect('mongodb://localhost:27017/Shopnow', {useNewUrlParser: true, useUnifiedTopology: true});

var schema = new mongoose.Schema({
    User:{
        type:String,
        required:true
    },
    ProductId:{
        type:String,
        required:true
    },
    Date:{
        type:Date,
        default:Date.now()
    },
    
});