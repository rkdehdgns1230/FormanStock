var express = require('express');
const router = express.Router();


const stockRouter = require('./stocks');
const boardRouter = require('./board');
const manageRouter = require('./manage');
const mypageRouter = require('./mypage');

router.use('/stocks', stockRouter);
router.use('/board', boardRouter);
router.use('/manage', manageRouter);
router.use('/mypage', mypageRouter);

router.get('/', (req, res, next) => { // localhost:3000/formanstock
    res.render('index', {
        'title': 'FormanStock',
        'welcome_comment': "KOSPI 주식 종목 거래와 종목 토론 서비스를 이용해 보세요!!"
    });
});

module.exports = router;
