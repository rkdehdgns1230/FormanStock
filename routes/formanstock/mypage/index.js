const express = require('express');
const mypageControllers = require('../../../controllers/mypageControllers');
const stockController = require('../../../controllers/stockController');
const router = express.Router();
// /* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('mypage/index', { title: 'Express' });
// });

router.get('/:user_id', mypageControllers.get_userINFO);
router.post('/change_pw/:user_id', mypageControllers.ChangePW);
router.post('/:stock_code/not-interest', mypageControllers.deleteInterestStockList);

module.exports = router;
