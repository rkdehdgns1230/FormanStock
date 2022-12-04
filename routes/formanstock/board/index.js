const express = require('express');
const router = express.Router();
var boardController = require('../../../controllers/boardController')
/* GET home page. */
router.get('/:stock_code/posts', boardController.getPage);

module.exports = router;
