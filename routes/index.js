var express = require('express');
var router = express.Router();
const formanstockRouter = require('./formanstock');
const loginRouter = require('./login-page');
const signUpRouter = require('./signup-page');

// formanstock router 미들웨어 등록
router.use('/', formanstockRouter);
router.use('/login-page', loginRouter);
router.use('/signup-page',signUpRouter);
module.exports = router;
