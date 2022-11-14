const express = require('express');
const router = express.Router();

const stockController = require('../../../controllers/stockController');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/:stock_code', stockController.getSpecificStockInfo);
router.post('/:stock_code/buy');
router.post('/:stock_code/sell');
// 임시로 company data 추가하는 api 추가
router.get('/:stock_code/importCompanyInfo', stockController.loadCompanyData);

module.exports = router;
