const express = require('express');
const router = express.Router();

const stockController = require('../../../controllers/stockController');

// 종목 관련 종합 정보를 제공하는 페이지 구현 예정
router.get('/', function(req, res, next) {
  res.render('index', { title: 'FormanStock' });
});

// 개별 종목 조회 페이지 제공
router.get('/:stock_code', stockController.getSpecificStockInfo);

router.post('/:stock_code/like', stockController.likeStock);
router.post('/:stock_code/unlike', stockController.unlikeStock);

router.post('/:stock_code/interest');
router.post('/:stock_code/not-interest');

router.post('/:stock_code/buy');
router.post('/:stock_code/sell');

// 임시로 company data 추가하는 api 추가
router.get('/:stock_code/importCompanyInfo', stockController.loadCompanyData);

module.exports = router;
