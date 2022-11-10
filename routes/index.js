var express = require('express');
var router = express.Router();
const formanstockRouter = require('./formanstock');

// formanstock router 미들웨어 등록
router.use('/', formanstockRouter);
 
module.exports = router;
