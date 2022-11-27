const express = require('express');
const mypageControllers = require('../../../controllers/mypageControllers');
const middleware = require('../../../controllers/middleware/auth')
const router = express.Router();
// /* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('mypage/index', { title: 'Express' });
// });



router.get('/', middleware.auth, mypageControllers.get_userINFO);
router.post('/change_pw/:user_id', middleware.auth, mypageControllers.ChangePW);

// router.get('/companies',manage_controllers.getlist_company);
// router.get('/users-suspension',manage_controllers.getlist_users_suspension);
// router.get('/users',manage_controllers.getlist_users);
// router.get('/comments',manage_controllers.getlist_comments);

module.exports = router;
