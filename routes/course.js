var express = require('express');
var router = express.Router();
var Course = require('../models/course');

/* GET home page. */
router.get('/:id', function(req, res, next) {

  var course = Course.get(req.params.id);

  res.render('course', { title: 'Express', course: course });
});

module.exports = router;
