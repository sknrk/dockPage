var express = require("express");
var passport = require("passport");
var User = require("../models/user");
const router= require("express").Router();

router.get("/",function(req,res){
  res.render("index/mindersolution");
});

//login page
router.get("/login",function(req,res){
  res.render("index/login");
});

// login post
router.post("/login",passport.authenticate("local",{
  successRedirect:"/",
  failureRedirect:"/login"
  }),function(req,res){
});

// register page
router.get("/register",function(req,res){
  res.render("index/register");
});


//register post
router.post("/register",function(req,res){
  var newUser = new User({username : req.body.username});
  User.register(newUser,req.body.password,function(err,user){
    if(err){
      console.log(err);
      return res.render("index/register");
    }
    passport.authenticate("local")(req,res,function(){
      res.redirect("/");
    });
  });
});

module.exports = router;
