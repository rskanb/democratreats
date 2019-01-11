var db = require("../models");
var passport = require("../config/passport");
var isAuthenticated = require("../config/middleware/isAuthenticated");

module.exports = function(app) {

  // {successRedirect: "/home", failureRedirect:"/"}
  app.post("/api/login", passport.authenticate("local"), function(req, res) {
    res.redirect("/home")
    });

  // Signup & Create a new USER
  app.post("/api/users", function(req, res) {
    console.log(req.body);
    db.User.create(req.body).then(function(dbUser) {
      res.json(dbUser);
    }).catch(function(err) {
      console.log(err);
      res.json(err);
      // res.status(422).json(err.errors[0].message);
    });
  });

  // Create a new POLL
  app.post("/api/polls", function(req, res) {
    console.log(req.body);
    db.Poll.create(req.body).then(function(dbPoll) {
      res.json(dbPoll);
    });
  });

  // Create a new OPTION
  app.post("/api/options", function(req, res) {
    console.log(req.body);
    db.Option.create(req.body).then(function(dbOption) {
      res.json(dbOption);
    });
  });

  // // LOG IN
  // app.post("/api/login", passport.authenticate("local"), function(req, res) {
  //   res.json("/home");
  // });

  //Get all poll
  app.get("/api/poll", function(req,res){
    // console.log(req);
    console.log("api poll route hit")
    db.Poll.findAll({}).then(function(dbpoll) {
      res.json(dbpoll);
  })
  });

  //Delete Poll Baserd on ID Selected 
  app.delete("/api/poll/:id", isAuthenticated, function(req, res){
    var delId = parseInt(req.params.id);
    db.Poll.destroy({
      where: {
        id: delId
      }
    }).then(function(dbPost) {
      res.json(dbPost);
    });
    });

    app.get("/api/polledit/:id", isAuthenticated, function(req, res){
      //var reqId = { id: parseInt(req.params.id)};
      if(req.user.admin){
        //res.json(reqId);
        res.redirect("/admin");
     }else {
        res.redirect("*")
     }
    })

  app.get("/logout", function(req,res){
    req.logout();
    console.log("logout");
    res.redirect("/");
  })
};
