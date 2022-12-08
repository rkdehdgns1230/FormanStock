const express = require('express');
const router = express.Router();
var boardController = require('../../../controllers/boardController')
/* GET home page. */
router.get('/:stock_code/posts', boardController.getPage);


router.get('/:stock_code/write-form', boardController.read_board); // 게시글 작성

router.get('/:stock_code/write-form', ); // 게시글 작성
router.get('/:stock_code/posts/:post_no', boardController.read_post); // 게시글 조회

router.get('/:stock_code/posts/:post_no/info', boardController.getUpdatepage)// 게시글 수정

router.post('/:stock_code/write-form', boardController.write_board); // 작성글 제출
router.post('/:stock_code/posts/:post_no/removal', boardController.remove_board)// 게시글 삭제
module.exports = router;
