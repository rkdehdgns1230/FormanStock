const mysql = require('mysql');
const companyData = require('../company_info.json');
const dbInfo = require('../controllers/config/dev.js');

const connection = mysql.createConnection(dbInfo.mySQL_config);

module.exports = {
    getSpecificStockInfo: (stock_code, cb) => {
        // 두 개의 sql문 실행 결과를 조회하자.
        // 주식 종목의 정보를 조회하는 sql문
        // 해당 주식의 가격 정보를 조회하는 sql문 (주식 그래프를 그리기 위함)
        const sql = `
        select c.stock_code, c.company_name, c.total_stock_num, c.company_info
        from stock s, company c 
        where s.stock_code = '${stock_code}'
        and s.stock_code = c.stock_code;

        select date_format(sp.stock_date, '%Y.%m.%d') stock_date, sp.close_price
        from STOCK_PRICE sp, stock s
        where s.stock_code = '${stock_code}'
        and s.stock_code = sp.stock_code;
        `;
        
        connection.query(sql, (err, rows) => {
            // rows[0]: 종목 정보
            // rows[1]: 종목 가격 정보
            if(err){
                console.log(err);
                return;
            }
            cb(rows[0], rows[1]);
            return;
        });
    },

    importCompanyInfo: (cb) => {
        const sql = `
        INSERT INTO COMPANY
        VALUES ?;
        `

        let values = [];
        
        console.log(companyData[0]);
        console.log(values);

        for(info in companyData){
            //console.log(companyData[info].종목코드);
            data = companyData[info];
            values.push([data.종목코드, data.기업이름, data.상장주식수, data.기업개요]);
        }
        console.log(values);
        
        connection.query(sql, [values], (err, rows) => {
            if(err){
                console.log(err);
                cb(false)
                return;
            }
            cb(true);
        });
    }
}
