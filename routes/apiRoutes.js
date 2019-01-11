var db = require("../models");
var passport = require("../config/passport");
var isAuthenticated = require("../config/middleware/isAuthenticated");
const url = require("url");
module.exports = function(app) {

  // {successRedirect: "/home", failureRedirect:"/"}
  app.post("/api/login", passport.authenticate("local"), function(req, res) {

    res.redirect("/home")
  });

  // Signup & Create a new USER
  app.post("/api/users", function (req, res) {
    console.log(req.body);
    db.User.create(req.body).then(function (dbUser) {
      res.json(dbUser);
    }).catch(function (err) {
      console.log(err);
      res.json(err);
      // res.status(422).json(err.errors[0].message);
    });
  });

  // Create a new POLL
  app.post("/api/polls", function (req, res) {
    console.log(req.body);
    db.Poll.create(req.body).then(function (dbPoll) {
      res.json(dbPoll);
    });
  });

  // Create a new OPTION
  app.post("/api/options", function (req, res) {
    console.log(req.body);
    db.Option.create(req.body).then(function (dbOption) {
      res.json(dbOption);
    });
  });

  //Get all poll
  app.get("/api/poll", function(req,res){
    // console.log(req);
    console.log("api getpoll route hit")
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

    app.post("/api/edit/:id", isAuthenticated, function(req, res){
      var reqId = req.params.id;
      if(req.user.admin){
        db.Poll.findOne({ where: { id: reqId } }).then(function(poll) {
          var editObject = {
            id: poll.dataValues.id,
            name: poll.dataValues.name,
            description: poll.dataValues.description
          }
          res.json(editObject);
          res.end();
        })
        //res.json(reqId);
        //res.redirect(url.format({pathname:"/admin",query:{reqId}}));
        //res.redirect("/admin");
        //console.log(url.format({pathname:"/admin",query: {reqId}}));
    }else {
        res.redirect("*")
     }
    });


  app.get("/logout", function (req, res) {
    req.logout();
    console.log("logout");
    res.redirect("/");
  })



app.put("/api/update", isAuthenticated, function(req,res){
    console.log("api update put route hit");
    console.log(req.body);
    db.Poll.update(
      req.body,
      {
        where: {
          id: req.body.id
        }
      }).then(function(dbPost) {
      res.json(dbPost);
    });
  });







};