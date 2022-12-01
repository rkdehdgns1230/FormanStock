const jwt = require('jsonwebtoken');


//mysql 연결
var mysql = require('mysql');
const config = require('../config/key');
var pool = mysql.createPool(config.mySQL_config);

let auth = function(req, res, next){
    //console.log("req: ", req)
    //인증을 처리하는 곳

    //client cookie에서 토큰을 가져오기
    /*
    {
    "cookies": 
        {
        "x_auth": "eyJhbGciOiJIUzI1NiJ9.MQ.CH-JSML5mw_OTVN85sa3ipfjoJyM_dLzGzawTdzxtdc"
        }
    }
    */ 
    //let token = req.body.cookies.x_auth; //=>위의 input의 test용
    
    let token = req.cookies.x_auth; //=> 원래는 이걸로해야함. test하려고 위에꺼 사용

    //console.log(req.cookies)
    //console.log(req.body.cookies.x_auth)
    console.log('auth given token: ' + token)
    //token을 복호화 한 후 user를 찾기
    jwt.verify(token, 'secretToken', function(err, decoded){
        console.log('Decoded member_email: ' + decoded)

        //유저아이디를 이용해서 유저를 찾은 다음 클라이언트에서 가져온 token과 DB에 보관된 토큰이 일치하는지 확인
        pool.getConnection(function(err, connection){
            var sqlForSelectMember = "SELECT * FROM user where USER_ID = ? && token = ?"
            var data = [decoded, token]
            connection.query(sqlForSelectMember, data, function(err,rows) {
                if(err) {
                    console.error("err: "+err);
                    return;
                }
                console.log('[auth]extracted rows: '+ JSON.stringify(rows))
                if(rows.length === 0){
                    /*
                    return res.json({
                    is_Auth: false,
                    message: "인증 실패"
                    });
                    */
                    // token 유무를 이용해 login 성공 여부를 판단, req.token === undefined 이용할 것
                    console.log("login fail");
                    console.log(`rows.length: ${rows.length}`);
                }
                else{
                    //middleware이기 때문에 다음 함수에 갈 수 있도록 해줌.
                    //이 때, req.token = token, req.row = rows[0] 이렇게 해주면 req안에 속성들이 생겨서 전달 가능.
                    //다음 함수에 req를 넘겨주기 위해 next()사용
                    console.log("login success");
                    console.log(`token: ${token}`);
                    // token과 user 정보를 request 객체에 담아준다. 
                    req.token = token;
                    req.row = rows[0];
                    console.log(req.row.USER_ID);
                }
            });
            // pool 방식은 이용후 connection release 해줘야 한다.
            connection.release();
            next();
        });
    });
};
module.exports = {auth};