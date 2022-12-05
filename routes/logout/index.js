const express = require('express');
const router = express.Router();

const logoutController = require('../../controllers/logoutController');

// "/formanstock/logout"으로 get 요청을 보내면, 로그아웃된다.
router.get('/', logoutController.logout);

module.exports = router;