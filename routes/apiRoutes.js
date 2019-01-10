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

  // app.get("/home", function(req, res) {
  //   if (!req.user) {
  //     // The user is not logged in, send back an empty object
  //     res.json({});
  //   }
  //   else {
  //     // Otherwise send back the user's email and id
  //     // Sending back a password, even a hashed password, isn't a good idea
  //     res.json({
  //       email: req.user.email,
  //       id: req.user.id,
  //     });
  //   }
  // });

  app.get("/logout", function(req,res){
    req.logout();
    console.log("logout");
    res.redirect("/");
  })
};
