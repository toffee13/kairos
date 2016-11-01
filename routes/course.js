var express = require('express');
var router = express.Router();
var Course = require('../models/course');

/* GET home page. */
router.get('/:id', function(req, res, next) {

  var course = Course.get(req.params.id, (course) => {
    res.render('course', { title: 'Express', course: JSON.stringify(course) });
  });

});

module.exports = router;
