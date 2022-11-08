const mysql = require('mysql');
const dbInfo = require('../config.json');

const connection = mysql.createConnection({
    "host": dbInfo.host,
    "user": dbInfo.user,
    "password": dbInfo.password,
    "database": dbInfo.database
});

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