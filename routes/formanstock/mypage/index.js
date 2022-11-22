const express = require('express');
const mypageControllers = require('../../../controllers/mypageControllers');
const router = express.Router();
// /* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('mypage/index', { title: 'Express' });
// });



router.get('/',mypageControllers.get_userINFO);

// router.get('/companies',manage_controllers.getlist_company);
// router.get('/users-suspension',manage_controllers.getlist_users_suspension);
// router.get('/users',manage_controllers.getlist_users);
// router.get('/comments',manage_controllers.getlist_comments);




module.exports = router;
