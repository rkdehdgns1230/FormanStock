const mysql = require('mysql');
const dbInfo = require('../controllers/config/dev.js');
const connection = mysql.createConnection(dbInfo.mySQL_config);

module.exports = {
    getMainPage: (stock_code1, stock_code2, callback) => {
        const sql = `select date_format(sp.stock_date, '%Y-%m-%d %H:%i:%S') stock_date, sp.close_price
        from STOCK_PRICE sp, stock s
        where s.stock_code = ?
        and s.stock_code = sp.stock_code;

        select date_format(sp.stock_date, '%Y-%m-%d %H:%i:%S') stock_date, sp.close_price
        from STOCK_PRICE sp, stock s
        where s.stock_code = ?
        and s.stock_code = sp.stock_code;
        
        SELECT post_no, post_title, user_id, date_format(reg_date, '%Y-%m-%d') post_date FROM POST;

        select s.stock_code, s.stock_name, count(*) like_cnt from like_stock ls, stock s where ls.stock_code = s.stock_code group by stock_code order by like_cnt limit 5;
        `

        connection.query(sql, [stock_code1, stock_code2], (err, rows) => {
            if(err){
                console.log(err);
                return;
            }
            else{
                // 1번 주식의 데이터, 2번 주식의 데이터, 종목토론방, 상위 5개 좋아요 주식
                callback(rows[0], rows[1], rows[2], rows[3]);
                return;
            }
        })
    }
}