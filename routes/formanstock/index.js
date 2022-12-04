var express = require('express');
const router = express.Router();
const mysql = require('mysql');
const dbInfo = require('../../controllers/config/dev.js');
const connection = mysql.createConnection(dbInfo.mySQL_config);

const stockRouter = require('./stocks');
const boardRouter = require('./board');
const manageRouter = require('./manage');
const mypageRouter = require('./mypage');
const searchRouter = require('./search');

const mainPageController = require('../../controllers/mainPageController');

router.use('/stocks', stockRouter);
router.use('/board', boardRouter);
router.use('/manage', manageRouter);
router.use('/mypage', mypageRouter);
router.use('/search', searchRouter);

// 웹 페이지의 메인 페이지를 보여주는 공간
router.get('/', mainPageController.getMainPage);

module.exports = router;
