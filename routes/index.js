var express = require('express');
var router = express.Router();
const formanstockRouter = require('./formanstock');
const loginRouter = require('./login-page');
const signUpRouter = require('./signup-page');

// 각 router를 url path에 맞게 미들웨어로 등록
// 각각의 미들웨어는 폴더를 통해 계층적으로 관리한다.
router.use('/formanstock', formanstockRouter);
router.use('/login-page', loginRouter);
router.use('/signup-page',signUpRouter);

module.exports = router;