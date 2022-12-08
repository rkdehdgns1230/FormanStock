const express = require('express');
const router = express.Router();

const stockController = require('../../../controllers/stockController');

// 종목 관련 종합 정보를 제공하는 페이지 구현 예정
router.get('/', function(req, res, next) {
  res.render('index', { title: 'FormanStock' });
});

// 개별 종목 조회 페이지 제공
router.get('/:stock_code', stockController.getSpecificStockInfo);

// 좋아요 누르기 or 취소
router.post('/:stock_code/like', stockController.likeStock);
router.post('/:stock_code/unlike', stockController.unlikeStock);

// 관심 종목 등록 및 해제 작업
router.post('/:stock_code/interest', stockController.registerInterestInStock);
router.post('/:stock_code/not-interest', stockController.excludeInterestInStock);

router.get('/:stock_code/trade', stockController.getStockTradePage);
router.post('/:stock_code/trade/buy', stockController.buyStock);
router.post('/:stock_code/trade/sell', stockController.sellStock);

// 임시로 company data 추가하는 api 추가
router.get('/:stock_code/importCompanyInfo', stockController.loadCompanyData);

module.exports = router;
