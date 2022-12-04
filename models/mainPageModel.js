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
        and s.stock_code = sp.stock_code;`

        connection.query(sql, [stock_code1, stock_code2], (err, rows) => {
            if(err){
                console.log(err);
                return;
            }
            else{
                callback(rows[0], rows[1]);
                return;
            }
        })
    }
}