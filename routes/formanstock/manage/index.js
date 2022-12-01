const express = require('express');
const router = express.Router();
var manage_controllers = require('../../../controllers/manageControllers');

/* GET home page. */ // 지금 이 method는 그냥 페이지 띄우기 위한 목적임 - uri정리에 없음 - 정리되면 다 날릴 예정
/*
router.get('/', function(req, res, next) { //localhost:3000/formanstock/manage
  res.render('index', { title: 'Express' });
});
*/
//localhost:3000/formanstock/manage/companies
router.get('/companies/register', function(req, res, next) { //localhost:3000/formanstock/manage
  res.render('manage/register-form');
}); 
router.get('/companies/:company_name/info', manage_controllers.get_company_info);
router.get('/board/:stock_code',manage_controllers.getlist_board);
router.get('/companies',manage_controllers.getlist_company);
router.get('/users-suspension',manage_controllers.getlist_users_suspension);
router.get('/users',manage_controllers.getlist_users);
router.get('/comments',manage_controllers.getlist_comments);

//정지, 삭제, 수정관련

router.post('/companies',manage_controllers.insert_company)
//회사 변경
router.post('/companies/:company_name/info',manage_controllers.update_company)
//유저 삭제
router.post('/users/:user_id/delete',manage_controllers.user_delete)
//유저 정지
router.post('/users/:user_id',manage_controllers.user_suspend);
//정지 유저 삭제
router.post('/users-suspension/:user_id',manage_controllers.suspended_user_delete)
//게시물 삭제
router.post('/board/:stock_code/posts/:post_no',manage_controllers.post_delete)
//댓글 삭제
router.post('/comments/:comment_no',manage_controllers.comment_delete)






module.exports = router;
