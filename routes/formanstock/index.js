var express = require('express');
const app = require('../../app');
var router = express.Router();

/* GET home page. */
app.use('/stocks',require('./routes/formanstock/stocks'));
app.use('/board',require('./routes/formanstock/board'));
app.use('/manage',require('./routes/formanstock/manage'));
app.use('/mypage',require('./routes/formanstock/mypage'));


module.exports = router;
