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

router.use('/stocks', stockRouter);
router.use('/board', boardRouter);
router.use('/manage', (req,res,next) =>{    
    const val = req.row.AUTHORITY;
    console.log("val:" + JSON.stringify(val));
    if(val != "MANAGER") 
        throw err;
    next();
},manageRouter);
router.use('/mypage', mypageRouter);
router.use('/search', searchRouter);

// 웹 페이지의 메인 페이지를 보여주는 공간
router.get('/', (req, res, next) => { // localhost:3000/formanstock
    // 웹 페이지의 이름과 환영 문구를 템플릿과 합쳐 랜더링한다.
    let loginSuccess = !(req.token === undefined);
    let loginString= loginSuccess ? "success" : "fail";
    console.log(`loginSuccess: ${loginSuccess}`);
    
    res.render('index', {
        title: 'FormanStock',
        welcome_comment: "KOSPI 주식 종목 거래와 종목 토론 서비스를 이용해 보세요!!",
        userInfo: {
            login: loginString,
            info: loginSuccess ? req.row : 'empty'
        },
        token: req.token
    });
});

module.exports = router;
