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

  app.post("/api/login", passport.authenticate("local"), function(req, res) {
    res.json("/home");
  });

};
