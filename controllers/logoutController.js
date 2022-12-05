const logoutModel = require('../models/logoutModel');

exports.logout = (req, res, next) => {
    console.log("로그아웃 실행");
    const email = req.row.user_id;
    const set_token = "";

    logoutModel.releaseToken(email, set_token, (success) => {
        // 성공했으면 메인 페이지로 redirection
        if(success){
            // 로그아웃에 성공하면 cookie를 삭제한다.
            res.clearCookie("x_auth");
            res.redirect('/formanstock');
        }
    });
}