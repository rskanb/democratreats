var db = require("../models");
var path = require("path");
var isAuthenticated = require("../config/middleware/isAuthenticated");
const url = require("url");

module.exports = function (app) {
  // Load index page
  app.get("/", function (req, res) {
    // if (req.user) {
    //   res.redirect("/home");
    // }
    if(req.user && user.admin){
      res.redirect("/home");
    }if(req.user && user.admin){
      res.redirect("/employee");
    }
    res.render("index", {
      msg: "Welcome!",
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
      // console.log(user.admin);
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
  });

  // //isAuthenticated,
  // app.get("/admin",  function(req, res) {
  //   // if(req.user.admin){
  //   var editId = parseInt(req.query.reqId);
  //   console.log( editId + " is " + typeof(editId));
  //   console.log("api edit poll route hit")
  //     db.Poll.findOne({ where: { id: editId } }).then(function(poll) {
  //       console.log("Query Done");
  //       if(poll){
  //       // res.type('.html') // => 'text/html'
  //       // res.type('json') // => 'application/json'
  //       // res.type('application/json') // => 'application/json'
  //       // res.type('png') // => image/png:
  //       // if(!res.headersSent) res.json({}, 0, 500);
  //       res.render("admin",{
  //         user: req.user
  //       });
  //       res.render("404");
  //     }else {

  //     }
  //     });
  //   // } else {
  //   //   res.redirect("*");
  //   // }
  //   });

  // Render 404 page for any unmatched routes
  app.get("*", function (req, res) {
    res.render("404");
  });

};
