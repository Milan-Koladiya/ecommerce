const express = require("express");
const app = express();
const conn = require("../connection/connection2cate");
const bodyparser = require("body-parser");
const multer = require("multer");
const path = require("path");

app.set("view engine", "ejs");
app.set("views", "./views");
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));
app.use(express.static(__dirname + "./API/Images/Uploads/"));

var Storage = multer.diskStorage({
  destination: "./API/Images/Uploads",
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

var upload = multer({
  storage: Storage,
}).single("file");

app.get("/add-category", function (req, res) {
  res.render("addcategory.ejs", {
    msg: "To Shopnow",
    username: req.session.user,
  });
});

app.post("/addcategory", upload, function (req, res, next) {
  if (req.session.user) {
    var category = new conn({
      Seller: req.session.user,
      Category: req.body.category,
      Product: req.body.product,
      Brand: req.body.brand,
      Price: req.body.price,
      Description: req.body.description,
      Image: req.file.filename,
      Date: Date.now(),
    });
    category
      .save()
      .then((data) => {
        res.status(201).json(res.redirect("/homepage"));
      })
      .catch((err) => {
        res.json("Error In send Data to Database");
      });
  } else {
    res.redirect("/sellerlogin");
  }
});

module.exports = app;
