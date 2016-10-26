var express = require('express');
var router = express.Router();
var Course = require('../models/courses');

/* GET home page. */
router.get('/', function(req, res, next) {
  var id = req.param('id')

  var course = Course.get(id);

  res.render('course_detail', { title: 'Express', course: course });
});

module.exports = router;
