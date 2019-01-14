var db = require("../models");
var passport = require("../config/passport");
var isAuthenticated = require("../config/middleware/isAuthenticated");
const url = require("url");

module.exports = function (app) {

  // Login {successRedirect: "/home", failureRedirect:"/"}
  app.post("/api/login", passport.authenticate("local"), function (req, res) {
    res.redirect("/home")
  });

  // Signup & Create a new USER
  app.post("/api/users", function (req, res) {
    console.log(req.body);
    db.User.create(req.body).then(function (dbUser) {
      //res.json(dbUser);
      res.redirect('/')
    }).catch(function (err) {
      //console.log(err);
      res.json(err);
      //res.redirect('/')
      // res.status(422).json(err.errors[0].message);
    });
  });

  // gets all Users
  app.get("/api/user", isAuthenticated, function (req, res) {
    console.log("api getuser route hit")
    db.User.findAll({})
      .then(function (dbUser) {
        res.json(dbUser);
      });
  });

  // Create a new POLL
  app.post("/api/polls", isAuthenticated, function (req, res) {
    console.log(req.body);
    db.Poll.create(req.body).then(function (dbPoll) {
      res.json(dbPoll);
    });
  });

  // Create a new OPTION
  app.post("/api/options", isAuthenticated, function (req, res) {
    console.log(req.body);
    db.Option.create(req.body).then(function (dbOption) {
      res.json(dbOption);
    });
  });

    // Create a new VOTE
    app.post("/api/votes", isAuthenticated, function (req, res) {
      console.log(req.body);
      db.Vote.create(req.body).then(function (dbVote) {
        res.json(dbVote);
      });
    });

    // Create a new REQUEST
    app.post("/api/requests", isAuthenticated, function (req, res) {
      console.log(req.body);
      db.Request.create(req.body).then(function (dbRequest) {
        res.json(dbRequest);
        console.log("request API hit");
      });
    });


  //Get all poll
  app.get("/api/poll", isAuthenticated, function (req, res) {
    // console.log(req);
    console.log("api getpoll route hit")
    console.log(" use id "+ req.user.id);
    var userId = req.user.id;
    db.Poll.findAll({
      include: [db.Option]

    }).then(function(dbpoll) {
      var newUserData = dbpoll.push({"userLoginId":  userId});
      console.log(newUserData);
      res.json(dbpoll);
    })
  });

  //Get all Request
  app.get("/api/request", isAuthenticated, function(req,res){
    // console.log(req);
    console.log("api get request route hit")
    db.Request.findAll({}).then(function(dbrequest) {
      res.json(dbrequest);
    })
  });

  //Get all Votes 
  app.get("/api/vote", isAuthenticated, function(req,res){
    // console.log(req+ "is the req side ID number thingy");
    console.log("api get vote request route hit")
    db.Vote.findAll({}).then(function(dbVote) {
      res.json(dbVote);
    })
  });

  //Delete Requests by Admin only
  app.delete("/api/request/:id", isAuthenticated, function (req, res) {
    var delReqId = parseInt(req.params.id);
    console.log("delete request route ended")
    db.Request.destroy({
      where: {
        id: delReqId
      }
    }).then(function (dbPost) {
      res.json(dbPost);
    });
  });   //Delete Request Function end 

  //Delete Poll Based on ID Selected 
  app.delete("/api/poll/:id", isAuthenticated, function (req, res) {
    var delId = parseInt(req.params.id);
    db.Option.destroy({
      where: {
        Pollid: delId
      }
    });
    db.Poll.destroy({
      where: {
        id: delId
      }
    }).then(function (dbPost) {
      res.json(dbPost);
    });
  });   //Delete Poll Function end

  app.post("/api/edit/:id", isAuthenticated, function (req, res) {
    var reqId = req.params.id;
    if (req.user.admin) {
      db.Poll.findOne({ where: { id: reqId } }).then(function (poll) {
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
    } else {
      res.redirect("*")
    }
  });

  app.get("/logout", function (req, res) {
    req.logout();
    console.log("logout");
    res.redirect("/");
  })


  app.put("/api/update", isAuthenticated, function (req, res) {
    console.log("api update put route hit");
    console.log(req.body);
    db.Poll.update(
      req.body,
      {
        where: {
          id: req.body.id
        }
      }).then(function (dbPost) {
        res.json(dbPost);
      });
  });

//Generate Vote Results 
app.get("/api/votes", isAuthenticated, function(req, res){   
  db.sequelize.query("SELECT A.id AS pollid, B.id AS optionid, A.name AS PollName, B.name AS OptionName, COUNT(C.id) AS Count FROM Polls AS A JOIN Options AS B ON A.id = B.PollId LEFT JOIN Votes AS C ON A.id = C.PollId AND B.id = C.OptionId GROUP BY A.id, B.id, A.name, B.name", { type: db.sequelize.QueryTypes.SELECT}).then(function(dbpoll) {
  console.log("api votes route has hit");
  res.json(dbpoll);
});

});   //Get VOTE result api function end 

//Generate Vote Results tried with include but not working 
// app.get("/api/votes", isAuthenticated, function(req, res){   
//   db.Vote.findAll({
//    //raw: true,
//    //attributes: ['id','name'],
//    attributes: ['UserId','PollId','OptionId'],
//     include: [{ 
//       model: db.Poll,
//       include:[{
//         //attributes: ['UserId','PollId','OptionId'],
//         // attribute: [Sequelize.fn('count', Sequelize.col('OptionId')), 'VoteCount'],
//         model: db.Option,
//         //group: ['PollId', "OptionId"]
//       }],
//     }],
//     // group: ['PollId']
//   }).then(function(dbpoll) {
//     console.log("api votes route has hit");
//     res.json(dbpoll);
//   });
  
  //console.log("api votes route has hit");
  //[sequelize.fn('COUNT', 'Post.id'), 'PostCount']
  
  // });   //Get VOTE result api function end 
  



};  //Keep this for module.exports


