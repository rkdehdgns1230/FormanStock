const mysql = require('mysql');
const dbInfo = require('../controllers/config/dev.js');
const connection = mysql.createConnection(dbInfo.mySQL_config);

module.exports = {
    // DB에서 검색어가 기업명 혹은 기업개요에 포함되는 종목의 정보를 질의하고, 그 결과를 반환하는 역할을 담당한다.
    searchStockList: (search, cb) => {
        // 기업명 혹은 기업 개요에 검색어가 포함되는 종목을 질의하는 sql문 
        const sql = `
        SELECT C.stock_code, C.company_name, C.company_info
        FROM COMPANY C
        WHERE C.company_name LIKE ('%${search}%') OR C.company_info LIKE ('%${search}%');
        `;
        
        connection.query(sql, (err, rows) => {
            if(err){
                console.log(err);
                return;
            }
            // 질의 결과를 callback function (controller)로 전달한다.
            console.log(rows);
            cb(rows);
        });
    }
}