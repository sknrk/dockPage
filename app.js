var express = require("express"),
    mongoose = require("mongoose"),
    bodyParser = require("body-parser"),
    dotenv = require("dotenv"),
    User = require("./models/user"),
    passport = require("passport"),
    LocalStrategy = require("passport-local");

var app = express();

// .env config
dotenv.config();

//database config
const config    =  require("./config/db")();

// app config
app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine","ejs");
app.use(express.static(__dirname + "/public"));
app.use(require("express-session")({
  secret : "Once again Rusty wins cutest dog",
  resave : false,
  saveUninitialized : false
}));

// passport js config
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// index
app.use('/', require('./routes/index'));

// checking for logged in
function isLoggedIn(req,res,next){
  if(req.isAuthenticated()){
    return next();
  }
  res.redirect("/login");
}

// server listen function
app.listen("3000",function(){
  console.log("Server Has Started on Port 3000");
});

var port=3000;
// app.listen(process.env.PORT || 5000, process.env.IP, function(){
//     console.log(`Example app listening on port ${port}!`);
// });
