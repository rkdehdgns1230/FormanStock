var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'FormanStock' }); //index.pug로 접근(title 변수 가지고)
});
 
module.exports = router;
