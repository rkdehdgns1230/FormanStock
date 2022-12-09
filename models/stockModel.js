const mysql = require('mysql');
const companyData = require('../company_info.json');
const dbInfo = require('../controllers/config/dev.js');

const connection = mysql.createConnection(dbInfo.mySQL_config);

module.exports = {
    getSpecificStockInfo: (user_id, stock_code, cb) => {
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

        SELECT post_no, post_title, user_id, date_format(reg_date, '%Y-%m-%d') post_date FROM POST WHERE STOCK_CODE = ? limit 5;
        `;
        
        connection.query(sql, [stock_code, stock_code, stock_code, user_id, stock_code, stock_code, user_id, stock_code, stock_code], (err, rows) => {
            // rows[0]: 종목 정보
            // rows[1]: 종목 가격 정보
            if(err){
                console.log(err);
                return;
            }
            // stockInfo, stockPriceInfo, likeCount, userLike, interestCount, userInterest
            cb(rows[0], rows[1], rows[2][0], rows[3], rows[4][0], rows[5], rows[6]);
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
        const sql = 'delete from LIKE_STOCK where user_id = ? and stock_code = ?;';

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
        const sql = 'delete from INTEREST_IN where user_id = ? and stock_code = ?;';

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
    getOnlyStockInfo: (stock_code, user_id, cb) => {
        let sql = `select c.stock_code, c.company_name, c.total_stock_num, c.company_info
        from stock s, company c 
        where s.stock_code = ?
        and s.stock_code = c.stock_code;

        select stock_code, stock_cnt from hold 
        where user_id = ? and stock_code = ?;
        
        select post_no, post_title, date_format(reg_date, '%Y-%m-%d %H:%i:%S') reg_date
        from post
        where stock_code = ? limit 10;

        select * from stock_price
        where stock_code = ?
        order by stock_date desc limit 1;
        `;

        let datas = [stock_code, user_id, stock_code, stock_code, stock_code];

        connection.query(sql, datas, (err, rows) => {
            if(err){
                console.log(err);
                cb(false, {empty: 'none'}, {empty: 'none'}, {empty: 'none'});
            }
            else{
                //console.log(rows[0]);
                cb(true, rows[0], rows[1], rows[2], rows[3]);
            }
            return;
        });
    },  
    buyStock: (user_id, stock_code, num, stock_price, cb) => {
        // 어쩔수 없다 판매나 구매를 무한 수량이 가능하다는 가정하에 구현해야될 것 같다.
        // 이미 보유한 종목은 개수를 올려야 하고
        // 새롭게 매수하는 종목은 hold에 추가해야 한다.
        const sql = `
        insert into trade
        values(null, ?, ?, ?, ?, ?, ?, ?);

        select count(*) cnt
        from hold
        where user_id=? and stock_code=?;
        `;
        let date = new Date();
        // 두 개의 query에 들어갈 data list
        let datas = [user_id, stock_code, num, stock_price, 'buy', date, 'y', user_id, stock_code];
        console.log("여기까지 돌아간다.");

        connection.query(sql, datas, (err, rows) => {
            const update_sql = `update hold
            set stock_cnt = stock_cnt + ?, total_trade_volume = total_trade_volume + ?
            where user_id=? and stock_code=?`;

            const insert_sql = `insert into hold
            values(?, ?, ?, 0.0, ?);`;
            // 매수 수량과 총 매수 금액 정보를 갱신한다.
            const trade_amount = stock_price * num;
            // 종목코드, 총거래가격, 사용자아이디, 거래수량을 이용한다.
            let insert_data = [stock_code, user_id, num, trade_amount];
            console.log(rows[1][0]);
            console.log(`rows[1].cnt: ${rows[1][0].cnt}`);
            if(err){
                console.log(err);
                return;
            }
            else{
                if(rows[1][0].cnt == 0){
                    connection.query(insert_sql, insert_data, (err, result) => {
                        // insert query 실행 결과를 반환
                        if(err){
                            console.log(err);
                            return;
                        }
                        else{
                            cb(true);
                        }
                    });
                }
                else{
                    connection.query(update_sql, [num, trade_amount, user_id, stock_code], (err, result) => {
                        // update query 실행 결과를 반환
                        if(err){
                            console.log(err);
                            return;
                        }
                        else{
                            cb(true);
                        }
                    });
                }
            }
        });
    },
    sellStock: (user_id, stock_code, num, stock_price, cb) => {
        // 전량 매도인지 아닌지는 따져야 한다.
        const sql = `
        insert into trade
        values(null, ?, ?, ?, ?, ?, ?, ?);

        select STOCK_CNT cnt
        from hold
        where user_id=? and stock_code=?;
        `;
        // 일부 매도의 경우
        // 거래 기록 + 보유 주식 일부 판매

        let date = new Date();
        // 두 개의 query에 들어갈 data list
        let datas = [user_id, stock_code, num, stock_price, 'sell', date, 'y', user_id, stock_code];
        console.log("여기까지 돌아간다.");

        connection.query(sql, datas, (err, rows) => {
            const update_sql = `update hold
            set stock_cnt = stock_cnt - ?, total_trade_volume = total_trade_volume + ?
            where user_id=? and stock_code=?`;

            const delete_sql = `delete from hold
            where user_id=? and stock_code=?;`;
            let delete_data = [user_id, stock_code];

            console.log(rows[1][0]);
            console.log(`rows[1].cnt: ${rows[1][0].cnt}`);
            if(err){
                console.log(err);
                return;
            }
            else{
                if(rows[1][0].cnt == num){
                    connection.query(delete_sql, delete_data, (err, result) => {
                        // delete query 실행 결과를 반환
                        if(err){
                            console.log(err);
                            return;
                        }
                        else{
                            cb(true);
                        }
                    });
                }
                else{
                    // 보유 수량과 총 매수 금액 정보를 갱신한다.
                    const trade_amount = stock_price * num;

                    connection.query(update_sql, [num, trade_amount, user_id, stock_code], (err, result) => {
                        // update query 실행 결과를 반환
                        if(err){
                            console.log(err);
                            return;
                        }
                        else{
                            cb(true);
                        }
                    });
                }
            }
        });
    }
}
