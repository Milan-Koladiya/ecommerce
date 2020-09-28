var mongoose = require("mongoose");

var conn = mongoose.connection;
var connection = mongoose.connect("mongodb://localhost:27017/Shopnow", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
var userschema = new mongoose.Schema({
  Fullname: {
    type: String,
  },
  Username: {
    type: String,
  },
  Emailid: {
    type: String,
  },
  Xender: {
    type: String,
  },
  Qualification: {
    type: String,
  },
  Password: {
    type: String,
  },
  Date: {
    type: Date,
    default: Date.now,
  },
});

var model = mongoose.model("User", userschema);

module.exports = model;
