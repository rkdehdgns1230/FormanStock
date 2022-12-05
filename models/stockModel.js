const mysql = require('mysql');
const companyData = require('../company_info.json');
const dbInfo = require('../controllers/config/dev.js');

const connection = mysql.createConnection(dbInfo.mySQL_config);

module.exports = {
    getSpecificStockInfo: (user_id, stock_code, cb) => {
        // 두 개의 sql문 실행 결과를 조회하자.
        // 주식 종목의 정보를 조회하는 sql문
        // 해당 주식의 가격 정보를 조회하는 sql문 (주식 그래프를 그리기 위함)
        const sql = `
        select c.stock_code, c.company_name, c.total_stock_num, c.company_info
        from stock s, company c 
        where s.stock_code = ?
        and s.stock_code = c.stock_code;

        select date_format(sp.stock_date, '%Y-%m-%d %H:%i:%S') stock_date, sp.close_price
        from STOCK_PRICE sp, stock s
        where s.stock_code = ?
        and s.stock_code = sp.stock_code;

        SELECT COUNT(*) like_count FROM LIKE_STOCK WHERE STOCK_CODE = ?;

        SELECT * FROM LIKE_STOCK WHERE USER_ID = ? and STOCK_CODE = ?;

        SELECT COUNT(*) interest_count FROM INTEREST_IN WHERE STOCK_CODE = ?;

        SELECT * FROM INTEREST_IN WHERE USER_ID = ? and STOCK_CODE = ?;
        `;
        
        connection.query(sql, [stock_code, stock_code, stock_code, user_id, stock_code, stock_code, user_id, stock_code], (err, rows) => {
            // rows[0]: 종목 정보
            // rows[1]: 종목 가격 정보
            if(err){
                console.log(err);
                return;
            }
            // stockInfo, stockPriceInfo, likeCount, userLike, interestCount, userInterest
            cb(rows[0], rows[1], rows[2][0], rows[3], rows[4][0], rows[5]);
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
    },
    // 해당 종목에 좋아요를 누른 경우
    likeStock: (stock_code, user_id, cb) => {
        // prepared statement 방식에 따라 sql문 작성
        const sql = 'insert into LIKE_STOCK values(?, ?);';

        connection.query(sql, [stock_code, user_id], (err, rows) => {
            if(err){
                console.log(err);
                cb(false);
            }
            else{
                // 간단하게 callback function에 성공을 알린다.
                cb(true);        
            }
            return;
        });
    },
    // 해당 종목에 좋아요를 취소한 경우
    unlikeStock: (stock_code, user_id, cb) => {
        const sql = 'delete from LIKE_STOCK where user_id = ? and stock_code = ?';

        connection.query(sql, [user_id, stock_code], (err, rows) => {
            if(err){
                console.log(err);
                cb(false);
            }
            else{
                // 간단하게 callback function에 성공을 알린다.
                cb(true);        
            }
            return;
        });
    },
    // 관심 종목에 추가
    insertInterestStockList: (stock_code, user_id, cb) => {
        const sql = 'insert into INTEREST_IN values(?, ?);';

        connection.query(sql, [user_id, stock_code], (err, rows) => {
            if(err){
                console.log(err);
                cb(false);
            }
            else{
                cb(true);
            }
            return;
        })
    },
    // 관심 종목에서 제외
    deleteInterestStockList: (stock_code, user_id, cb) => {
        const sql = 'delete from INTEREST_IN where user_id = ? and stock_code = ?';

        connection.query(sql, [user_id, stock_code], (err, rows) => {
            if(err){
                console.log(err);
                cb(false);
            }
            else{
                cb(true);
            }
            return;
        })
    },
    getOnlyStockInfo: (stock_code, cb) => {
        const sql = `select c.stock_code, c.company_name, c.total_stock_num, c.company_info
        from stock s, company c 
        where s.stock_code = ?
        and s.stock_code = c.stock_code;`;
        
        connection.query(sql, [stock_code], (err, rows) => {
            if(err){
                console.log(err);
                cb(false, {empty: 'none'});
            }
            else{
                //console.log(rows[0]);
                cb(true, rows[0]);
            }
            return;
        });
    }
}
