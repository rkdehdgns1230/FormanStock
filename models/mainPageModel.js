const mysql = require('mysql');
const dbInfo = require('../controllers/config/dev.js');
const connection = mysql.createConnection(dbInfo.mySQL_config);

exports.getStockList = (cb) => {
    const sql = `select * from stock, company
    where stock.stock_code = company.stock_code`;

    connection.query(sql, (err, rows) => {
        if(err){
            console.log(err);
            return;
        }
        // callback function에 sql 실행 결과를 돌려준다.
        cb(rows);
    })
}