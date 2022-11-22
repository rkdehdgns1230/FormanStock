const express = require('express');
const router = express.Router();
var loginController = require('../../controllers/loginPageController');
/* GET home page. */
router.get('/', loginController.getPage);
router.post('/', loginController.login);
module.exports = router;
