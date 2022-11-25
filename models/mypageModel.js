var mysql = require('mysql');
var express = require('express');
const dbInfo = require('../controllers/config/dev.js');
const connection = mysql.createConnection(dbInfo.mySQL_config);
// select s.stock_name, p.open_price, p.close_price, p.high_price, p.low_price, p.trading_volume
//     from interest_in i, stock s, stock_price p
//     where i.stock_code = s.stock_code and i.stock_code = p.stock_code and i.user_id = ?
//     ;

// select
//     s.stock_name, p.open_price, p.close_price, p.high_price, p.low_price, p.trading_volume
//     from(
//         select
//             *
//         from stock_price
//         where (stock_code, stock_date) in (
//             select stock_code, max(stock_date) as stock_date
//             from stock_price group by stock_code
//         )
//         order by stock_date desc
//     ) p, interest_in i, stock s
//     where i.stock_code = s.stock_code and i.stock_code = p.stock_code and i.user_id = ?
//     group by p.stock_code;


exports.get_userINFO=(id, callback)=>{
    const sql = `
    select s.stock_name, date_format(t.reg_date,'%Y-%m-%d') reg_date, t.trade_price, t.trade_stock_cnt
    from hold h, trade t, stock s
    where h.stock_code = t.stock_code and h.user_id = t.user_id and s.stock_code = h.stock_code and h.user_id = ?;

    
    
    select
    s.stock_name, p.open_price, p.close_price, p.high_price, p.low_price, p.trading_volume
    from(
        select
            *
        from stock_price
        where (stock_code, stock_date) in (
            select stock_code, max(stock_date) as stock_date
            from stock_price group by stock_code
        )
        order by stock_date desc
    ) p, interest_in i, stock s
    where i.stock_code = s.stock_code and i.stock_code = p.stock_code and i.user_id = ?
    group by p.stock_code;

    select user_id, user_passwd, user_real_name, age from USER where user_id = ?;`;
    connection.query(sql, [id, id, id], (err,rows,fields)=>{
        if(err) throw err;
        callback(rows);
       });
    }

