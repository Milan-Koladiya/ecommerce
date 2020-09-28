const express = require("express");
const app = express();
const conn = require("../connection/connection2cate");

app.set("view engine", "ejs");
app.set("views", "./views");
app.use(express.static(__dirname + "/Images"));

app.get("/shopnow/user/home", function (req, res) {
  var data = conn
    .find({})
    .count()
    .exec()
    .then((doc) => {
      var num = doc / 5;
      var b = Math.ceil(num);
      conn
        .find({})
        .exec()
        .then((data7) => {
          if (req.session.username) {
            res.render("home", {
              username: req.session.username,
              msgg: "",
              msg: "",
              records: data7,
              num: b,
            });
          } else {
            res.render("home", {
              msgg: "s",
              msg: "To Shopnow",
              username: "",
              records: data7,
            });
          }
        });
    });
});

app.post("/search/", function (req, res) {
  var product = req.body.user;
  if (product !== "") {
    var search = { Product: product };
  } else {
    var search = {};
  }
  conn
    .find(search)
    .exec()
    .then((data) => {
      if (req.session.username) {
        res.render("home", {
          username: req.session.username,
          msgg: "",
          msg: "",
          records: data,
        });
      } else {
        res.render("home", {
          msgg: "",
          msg: "To Shopnow",
          username: "",
          records: data,
        });
      }
    });
});

app.get("/Autocomplete/", function (req, res, next) {
  var regex = new RegExp(req.query["term"], "i");
  var find = conn
    .find({ Product: regex }, { Product: 1 })
    .sort({ updated_at: -1 })
    .sort({ created_at: -1 })
    .limit(20);
  find.exec(function (err, data) {
    var result = [];
    if (!err) {
      if (data && data.length && data.length > 0) {
        data.forEach((categori) => {
          let obj = {
            id: categori._id,
            label: categori.Product,
          };
          result.push(obj);
        });
      }
      res.jsonp(result);
    }
  });
});

module.exports = app;
