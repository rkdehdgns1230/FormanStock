var mysql = require('mysql');
var express = require('express');
const dbInfo = require('../controllers/config/dev.js');
const connection = mysql.createConnection(dbInfo.mySQL_config);

//비밀 번호 암호화
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const saltRounds = 10

exports.get_userINFO=(id, callback)=>{
    const sql = `
    select s.stock_name, h.stock_cnt, s.stock_code, h.total_trade_volume
    from hold h, stock s
    where s.stock_code = h.stock_code and h.user_id = ?;

    
    
    select
    s.stock_name, p.open_price, p.close_price, p.high_price, p.low_price, p.trading_volume, s.stock_code, count(l.stock_code) AS LIKE_CNT
    from(
        select
            *
        from stock_price
        where (stock_code, stock_date) in (
            select stock_code, max(stock_date) as stock_date
            from stock_price group by stock_code
        )
        order by stock_date desc
    ) p, interest_in i LEFT JOIN like_stock l ON i.stock_code = l.stock_code, stock s
    where i.stock_code = s.stock_code and i.stock_code = p.stock_code and i.user_id = ?
    group by p.stock_code;

    select user_id, user_passwd, user_real_name, age from USER where user_id = ?;
    
    select s.stock_name, date_format(t.reg_date,'%Y-%m-%d') reg_date, t.trade_price, t.trade_stock_cnt, t.trade_type, t.trade_yn, s.stock_code
    from trade t, stock s
    where s.stock_code = t.stock_code and t.user_id = ?;
    
    `;
    connection.query(sql, [id, id, id, id], (err,rows,fields)=>{
        if(err) throw err;
        callback(rows);
    });
}


exports.ChangePW=(req, res, Data, callback)=>{
    // // email에 해당하는 member 정보 가져오기
    // if(Data['newpassword'] != Data['renewpassword']){
        
    //     callback(0);
    // }
    
    //var sqlForFindPW = "SELECT USER_PASSWD FROM user where USER_ID = ? "
    var password = Data['password']
    var new_password = Data['newpassword']
    var renew_password = Data['renewpassword']
    var user_id = req.row.USER_ID
    console.log("패스워드다: "+JSON.stringify(Data['password']))
    bcrypt.compare(password, req.row.USER_PASSWD, function (err, isMatch) {
        if (err) console.error("login_bcrpyt_compare_eror: " + err);
        if (!isMatch){
            callback(0);
        }
        else if(new_password != renew_password){
            callback(1)
        }
        else if(new_password ==renew_password){
            console.log("user_id: " + JSON.stringify(user_id))
            console.log(JSON.stringify(password))
            bcrypt.genSalt(saltRounds, function(err,salt){
                if (err) console.error("bcrypt err: " + err);
                bcrypt.hash(new_password, salt, function(err, hash){
                    if (err) console.error("bcrypt err: " + err);
                    new_password = hash
                    console.log("Hashed: " + new_password)
                    var sqlForUpdateMember = "Update user SET USER_PASSWD = ? WHERE USER_ID=?"
                    connection.query(sqlForUpdateMember, [new_password, user_id], function (err, result) {
                        if (err) console.error("login_token_update_err: ", err);
                        callback(2);
                    });
                })
            })
            
        }else{
            callback();
        }
    })
    
}

exports.deleteInterestStockList=(stock_code, user_id, callback)=>{
    const sql = 'delete from INTEREST_IN where user_id = ? and stock_code = ?';
    console.log('Success')
    connection.query(sql, [user_id, stock_code], (err, rows) => {
        if(err){
            console.log(err);
            callback(false);
        }
        else{
            
            callback(true);
        }
        return;
    })
    
}