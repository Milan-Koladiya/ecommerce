const mongoose = require('mongoose');

var conn = mongoose.connection;
var connection = mongoose.connect('mongodb://localhost:27017/Shopnow', {useNewUrlParser: true, useUnifiedTopology: true})
var schema = new mongoose.Schema({
    Seller:{
    type:String,
        require:true
    },
    Category:{
        type:String,
        require:true
    },
    Product:{
        type:String,
        required:true
    },
    Brand:{
        type:String,
        required:true
    },
    Price:{
        type:Number,
        required:true
    },
    Description:{
        type:String,
        required:true
    },
    Image:{
        type:String,
        required:true
    },
    Date:{
        type:Date,
        default:Date.now()
    }
});

var Model = mongoose.model('category',schema);

module.exports = Model;