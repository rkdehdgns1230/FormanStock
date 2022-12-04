const mysql = require('mysql');
const dbInfo = require('../controllers/config/dev.js');
const connection = mysql.createConnection(dbInfo.mySQL_config);

//비밀 번호 암호화
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

//인증
//const { auth } = require("../middleware/auth");

module.exports = {checkUser(req, res, datas, callback){
    //console.log('checkUser 진입')
    // 전달 받은 data
    member_email = datas[0]
    member_password = datas[1]
    // email에 해당하는 member 정보 가져오기
    var sqlForSelectMember = "SELECT * FROM user where USER_ID = ? "
    connection.query(sqlForSelectMember, member_email, function(err, rows){
        console.log("rows : "+JSON.stringify(rows));

        if (rows.length === 0) {
            console.log('해당하는 이메일 없음!')
        }
        
         bcrypt.compare(member_password, rows[0].USER_PASSWD, function (err, isMatch) {
            if (err) console.error("login_bcrpyt_compare_eror: " + err);
            //if (!isMatch)
            //==return res.json({ loginSuccess: false, message: "비밀번호가 틀렸습니다." });
            //비밀번호 까지 맞다면 토큰을 생성하기.
            //jsonwebtoken을 이용해서 token생성
            var token = jwt.sign(rows[0].USER_ID, 'secretToken')
            var data = [token, member_email]
            console.log('data:'+data)
            var sqlForUpdateMember = `Update user SET TOKEN=? WHERE USER_ID=?;`                                      ;
            connection.query(sqlForUpdateMember, data, function (err, result) {                 
                if (err) console.error("login_token_update_err: ", err);
                res.cookie("x_auth", token);             
                callback(rows[0]);              
            });
            //res.redirect('/') //-> board로 redirect
            //connection.release();
        })
    });
}}