var express = require('express');
var router = express.Router();

var Course = require('../models/course');

router.get('/', function(req, res, next) {
  var page = req.query.page || 1;

  var courses = Course.list(page);

  res.render('course_list', {
    title: '강의 리스트',
    courseList: courses.data,
    total: courses.total,
    pagination: Course.getPagination(page, 12)
  });

});

router.get('/:id', function(req, res, next) {

  var courseDetail = Course.get(req.params.id);


  console.log(`Selected course: ${JSON.stringify(courseDetail)}`);
  res.render('course', { title: courseDetail.name, course: courseDetail });


});

module.exports = router;
test