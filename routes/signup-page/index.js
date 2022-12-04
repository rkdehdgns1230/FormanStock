const express = require('express');
const router = express.Router();
var signUpPageController = require('../../controllers/signUpPageController');
/* GET home page. */
router.get('/', signUpPageController.getPage);
router.post('/', signUpPageController.signUp);
module.exports = router;
