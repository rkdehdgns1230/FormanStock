const express = require('express');
const router = express.Router();
var manage_controllers = require('../../../controllers/manageControllers');

/* GET home page. */ // 지금 이 method는 그냥 페이지 띄우기 위한 목적임 - uri정리에 없음 - 정리되면 다 날릴 예정
router.get('/', function(req, res, next) { //localhost:3000/formanstock/manage
  res.render('index', { title: 'Express' });
});
//localhost:3000/formanstock/manage/companies
router.get('/companies',manage_controllers.getlist_company);
module.exports = router;
