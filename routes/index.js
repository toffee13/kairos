var express = require('express');
var router = express.Router();
var http = require('http');


/* GET home page. */
router.get('/', function(req, res, next) {


  console.log("this is log");

  res.render('index', { title: 'Express' });
});

module.exports = router;
