var express = require('express');
var router = express.Router();
var Field = require('../core/model/field.js');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {field: new Field({width: 1000, playerWidth: 300})});
});

module.exports = router;
