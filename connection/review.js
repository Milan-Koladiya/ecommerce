const mongoose = require('mongoose');

var connection = mongoose.connect('mongodb://localhost:27017/Shopnow', {useNewUrlParser: true, useUnifiedTopology: true});

var schema = new mongoose.Schema({
    User :{
        type:String,
        require:true
    },
    Review :{
        type:String,
        require:true
    },
    ProductId:{
        type:String,
        require:true
    },
    Date:{
        type:Date,
        default: Date.now
    }
});

var Model = mongoose.model('Review',schema);

module.exports = Model;