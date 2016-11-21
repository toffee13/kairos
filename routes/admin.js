var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    res.render('admin/dashboard', { title: "Administrator"});
});

router.get('/login', function(req, res, next) {
    res.render('admin/login', { title: "Administrator Login"});
});

router.get('/notice', function(req, res, next) {
    res.render('admin/notice', { title: "Administrator"});
});

module.exports = router;