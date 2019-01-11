var db = require("../models");
var passport = require("../config/passport");

module.exports = function(app) {

  // {successRedirect: "/home", failureRedirect:"/"}
  app.post("/api/login", passport.authenticate("local"), function(req, res) {
    // return true;
    //res.json({value:"true"});
    res.redirect("/home")
    });

  // Get all examples
  // app.get("/api/users", function(req, res) {
  //   db.User.findAll({}).then(function(dbUsers) {
  //     res.json(dbUsers);
  //   });
  // });

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

  // LOG IN
  app.post("/api/login", passport.authenticate("local"), function(req, res) {
    res.json("/home");
  });

  //Get all poll
  app.get("/api/poll", function(req,res){
    console.log(req);
    console.log("api poll route hit")
    db.Poll.findAll({}).then(function(dbpoll) {
      // var pollObj = {
      //   pollData: dbpoll.pollData
      // }
      // //console.log(pollObj.pollData);

      res.json(dbpoll);
      //res.json(dbpoll)});
  })
});
  app.delete("/api/poll/:id", function(req, res){
    console.log(req.params.id);
    // var id1 = parseInt(req.params.id);
    // db.Post.destroy({
    //   where: {
    //     id: id1
    //   }
    // }).then(function(dbPost) {
    //   res.json(dbPost);
    });


  app.get("/logout", function(req,res){
    req.logout();
    console.log("logout");
    res.redirect("/");
  })
};
