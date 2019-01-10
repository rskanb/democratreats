var db = require("../models");
var path = require("path");
var isAuthenticated = require("../config/middleware/isAuthenticated");

module.exports = function (app) {
  // Load index page
  app.get("/", function (req, res) {
    if (req.user) {
      res.redirect("/home");
    }
    res.render("index", {
      msg: "Welcome!",
    });
  });

  // app.get("/", function(req, res) {
  //   db.Example.findAll({}).then(function(dbExamples) {
  //     res.render("index", {
  //       msg: "Welcome!",
  //       examples: dbExamples
  //     });
  //   });
  // });

  // app.get("/api/login", function(req, res) {
  //   //console.log(req.user)
  //     if(req.user){
  //       res.redirect("/home");
  //     }
  //     res.render("index", {
  //       msg: "Welcome!"
  //     });
  // });


  // app.get("/employee", function (req, res) {
  //   res.render("employee", {
  //     msg: "Welcome!"
  //   });
  // });

  // app.get("/admin", function (req, res) {
  //   res.render("admin", {
  //     msg: "Welcome!"
  //   });
  // });


  // app.get("/home", function (req, res) {
  //   res.render("home", {
  //     msg: "Welcome!"
  //   });
  // });


  app.get("/home", function (req, res) {
    res.render("home", {
      msg: "Welcome!"
    });
  });

  // Load example page and pass in an example by id
  // app.get("/example/:id", function (req, res) {
  //   db.Example.findOne({ where: { id: req.params.id } }).then(function (dbExample) {
  //     res.render("example", {
  //       example: dbExample
  //     });
  //   });
  // });

  app.get("/home",  isAuthenticated, function(req, res) {
    //console.log(req.user);
    db.User.findOne({ where: { email: req.user.email } }).then(function(user) {
      console.log(user.admin);
      if(user.admin){
        console.log("inside table")
        res.render("home", {
          user: req.user
        });
      }else {
        res.render("employee", {
          user: req.user
        });
      }
    });
    console.log("getting to route /home");
    //console.log(isAuthenticated());
    // res.partials("home", {
    //   msg: "Welcome!",
    // });
  });


  // Render 404 page for any unmatched routes
  app.get("*", function (req, res) {
    res.render("404");
  });

  
};
