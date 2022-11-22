var mysql = require('mysql');
var connection = mysql.createConnection({
    connectionLimit: 5,
    host: 'localhost',
    user: 'root',
    password: '0406',
    database: 'stock_market'
})

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
        //if(err) console.error("err : "+err);
        console.log("rows : "+JSON.stringify(rows));
        //console.log(rows.length)
        // 해당 하는 이메일이 없다면
        /*if (rows.length === 0) {
            return res.json({
                loginSucess: false,
                message: "제공된 이메일에 해당하는 유저가 없습니다."
            })
        }*/
        if (rows.length === 0) {
            console.log('해당하는 이메일 없음!')
        }
        //console.log('해당하는 이메일 있음')
        //console.log(rows[0].USER_PASSWD)
        //해당 하는 이메일이 있다면
        //요청된 이메일이 데이터베이스에 있다면 비밀번호가 맞는 비밀번호인지 확인
        bcrypt.compare(member_password, rows[0].USER_PASSWD, function (err, isMatch) {
            if (err) console.error("login_bcrpyt_compare_eror: " + err);
            //if (!isMatch)
            //==return res.json({ loginSuccess: false, message: "비밀번호가 틀렸습니다." });
            //비밀번호 까지 맞다면 토큰을 생성하기.
            //jsonwebtoken을 이용해서 token생성
            var token = jwt.sign(rows[0].USER_ID, 'secretToken')
            var data = [token, member_email]
            console.log('data:'+data)
            var sqlForUpdateMember = "Update user SET TOKEN=? WHERE USER_ID=?"
            connection.query(sqlForUpdateMember, data, function (err, result) {
                //console.log(data);
            // 토큰 저장-> 쿠키 
                if (err) console.error("login_token_update_err: ", err);
                res.cookie("x_auth", token)
                callback();
            });
            //res.redirect('/') //-> board로 redirect
            //connection.release();
        })
    });
}}