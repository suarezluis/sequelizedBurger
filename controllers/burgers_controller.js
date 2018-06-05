var express = require("express");

var router = express.Router();

// Import the model (burger.js) to use its database functions.
var models = require("../models");

// Create all our routes and set up logic within those routes where required.
router.get("/", function(req, res) {
  models.burgers.findAll()
     .then(function(data){
          res.render('index', {burgers : data});
     });
});

router.post("/burger/post", function(req, res) {
  models.burgers.create({
    burger_name: req.body.name,
    devoured: 0})
    .then(function() {
 res.redirect('/');
  });
});

router.post("/burger/update/:id", function(req, res) {
  var condition = "id = " + req.params.id;

  console.log("condition", condition);
  console.log(req);
  
  var theId = req.params.id;
	models.burgers.update(
          {devoured : true}, {where: { id: theId}}
     ).then(function() {
          res.redirect('/');
     });

});

router.post("/burger/delete/:id", function(req, res) {
  var condition = "id = " + req.params.id;
  console.log(condition);
  var burgerId = req.params.id;
  models.burgers.destroy({ where: { id: burgerId } }).then(function() {
    res.redirect("/");
  });
});

router.get("/burger/reset", function(req, res) {
  models.burgers.destroy({ where: {  } }).then(function() {
    
  });
  models.burgers.create({
    burger_name: "Diablo",
    devoured: 0})
    .then(function() {
 
  });

  models.burgers.create({
    burger_name: "Vegetarian",
    devoured: 0})
    .then(function() {
 
  });

  models.burgers.create({
    burger_name: "Bison",
    devoured: 0})
    .then(function() {
 res.redirect('/');
  });
  
});

// Export routes for server.js to use.
module.exports = router;
