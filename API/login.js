const express = require("express");
const app = express();
const bodyparser = require("body-parser");

const Model = require("../connection/connection");

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.set("views", "./views");

app.get("/shopnow/user/login-page", function (req, res) {
  if (req.session.username) {
    res.redirect("/shopnow/user/home");
  } else {
    res.render("login", { msg: "msgg", msgg: "", message: "" });
  }
});

app.post("/shopnow/user/home", function (req, res) {
  var Username = req.body.username;
  var password = req.body.password;
  console.log(Username, password);
  var data = Model.findOne(
    { $and: [{ Username: Username, Password: password }] },
    function (err, data) {
      if (err) {
        res.json("Error in Fetch data");
      }
      if (data) {
        req.session.username = Username;
        res.redirect("/shopnow/user/home");
      } else {
        res.render("login", { msgg: "message", msg: "", message: "" });
      }
    }
  );
});

module.exports = app;
