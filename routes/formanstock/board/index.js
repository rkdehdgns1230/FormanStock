const express = require('express');
const router = express.Router();
var boardController = require('../../../controllers/boardController')
/* GET home page. */
router.get('/:stock_code/posts', boardController.getPage);

router.get('/:stock_code/posts', ); // 종목토론 게시판 조회
router.get('/:stock_code/write-form', ); // 게시글 작성
router.get('/:stock_code/posts/:post_no', ); // 게시글 조회


router.post('/:stock_code/write-form', ); // 작성글 제출
router.post('/:stock_code/posts/:post_no', ); // 게시글 수정

module.exports = router;
