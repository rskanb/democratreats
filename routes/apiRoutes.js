var db = require("../models");
var passport = require("../config/passport");

module.exports = function(app) {
  // Get all examples
  app.get("/api/users", function(req, res) {
    db.User.findAll({}).then(function(dbUsers) {
      res.json(dbUsers);
    });
  });

  // Create a new USER
  app.post("/api/users", function(req, res) {
    console.log(req.body);
    db.User.create(req.body).then(function(dbUser) {
      res.json(dbUser);
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

};
