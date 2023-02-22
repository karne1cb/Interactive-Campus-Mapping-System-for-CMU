/**
 * This file is the / endpoint router
 */

var express = require('express');
var router = express.Router();
const adminCheck = require('../adminCheck');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* Test admin-checking functionality */
router.get('/adminTest', adminCheck, function(req, res, next){
  res.status(200).send('Admin');  
});

module.exports = router;
