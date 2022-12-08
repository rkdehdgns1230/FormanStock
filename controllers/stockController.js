const stockModel = require('../models/stockModel');

module.exports = {
    getSpecificStockInfo: (req, res, next) => {
        // 종목 코드는 path parameter 형태로 넘어온다.
        const stock_code = req.params.stock_code;
        const user_id = req.token !== undefined ? req.row.USER_ID : 'unknown';
        

        stockModel.getSpecificStockInfo(user_id, stock_code, (stockInfo, stockPriceInfo, likeCount, userLike, interestCount, userInterest) => {
            //res.send([stockInfo, stockPriceInfo]);
            // stock_info template과 data를 결합해 rendering한다.
            //console.log(stockPriceInfo[0].close_price);
            
            let loginSuccess = !(req.token === undefined);
            let loginString= loginSuccess ? "success" : "fail";
            console.log(loginSuccess, loginString);
            console.log(likeCount, userLike);
            
            // 종가 가격 리스트와 그에 맞는 날짜 정보 리스트 형태로 데이터를 변환해서 view component(template)로 넘겨준다.
            let dateList = new Array();
            let closePriceList = new Array();
            // 리스트에 append 해준다.
            for(let i = 0; i < stockPriceInfo.length; i++){
                dateList.push(String(stockPriceInfo[i].stock_date));
                closePriceList.push(stockPriceInfo[i].close_price);
            }

            // template과 data를 합쳐서 rendering 한다.
            res.render('stock/stock_info', {
                title: 'FormanStock',
                stockInfo: {
                    stockCode: stockInfo[0].stock_code,
                    companyName: stockInfo[0].company_name, 
                    totalStockNum: stockInfo[0].total_stock_num, 
                    companyInfo: stockInfo[0].company_info,
                    like: likeCount.like_count,
                    interest: interestCount.interest_count
                },
                userInfo: {
                    like: userLike != 0 ? true : false, // 좋아요 누른 기록 없으면 0일것
                    interest: userInterest != 0 ? true : false, // 관심 종목 누른 기록 없으면 0일것
                    login: loginString,
                    info: loginSuccess ? req.row : 'empty'
                },
                stockDateList: dateList,
                stockClosePriceList: closePriceList
            });
        });
    },
    loadCompanyData: (req, res, next) => {
        stockModel.importCompanyInfo((success)=>{
            console.log("성공??")
            if(success){
                res.send("데이터추가 성공!");
            }
            else{
                res.send("데이터 추가 실패!!");
            }
        });

    },
    likeStock: (req, res, next) => {
        console.log(`아이디 뭐냐: ${req.row.USER_ID}`);
        const user_id = req.row.USER_ID;
        const stock_code = req.params.stock_code;
        console.log("like 작업");
        stockModel.likeStock(stock_code, user_id, (success) => {
            if(success){
                console.log("like stock!!");
                // stock information 조회 페이지로 redirection
                res.redirect(`/formanstock/stocks/${stock_code}`);
            }
            else{
                // 일단은 실패해도 redirection
                res.redirect(`/formanstock/stocks/${stock_code}`);
            }
        })
    },
    unlikeStock: (req, res, next) => {
        const user_id = req.row.USER_ID;
        const stock_code = req.params.stock_code;
        console.log("unlike 작업");
        stockModel.unlikeStock(stock_code, user_id, (success) => {
            if(success){
                // stock information 조회 페이지로 redirection
                res.redirect(`/formanstock/stocks/${stock_code}`);
            }
            else{
                // 일단은 실패해도 redirection
                res.redirect(`/formanstock/stocks/${stock_code}`);
            }
        });
    },
    registerInterestInStock: (req, res, next) => {
        const user_id = req.row.USER_ID;
        const stock_code = req.params.stock_code;
        console.log("관심 종목 등록 작업");

        stockModel.insertInterestStockList(stock_code, user_id, (success) => {
            // 일단 성공 실패 상관없이 종목 조회 페이지로 redirection
            if(success){
                res.redirect(`/formanstock/stocks/${stock_code}`);
            }
            else{
                res.redirect(`/formanstock/stocks/${stock_code}`);
            }
        });
    },
    excludeInterestInStock: (req, res, next) => {
        const user_id = req.row.USER_ID;
        const stock_code = req.params.stock_code;
        console.log("관심 종목 제외 작업");

        stockModel.deleteInterestStockList(stock_code, user_id, (success) => {
            // 일단 성공 실패 상관없이 종목 조회 페이지로 redirection
            if(success){
                res.redirect(`/formanstock/stocks/${stock_code}`);
            }
            else{
                res.redirect(`/formanstock/stocks/${stock_code}`);
            }
        });
    },
    getStockTradePage: (req, res, next) => {
        // 종목 코드는 path parameter 형태로 넘어온다.
        const stock_code = req.params.stock_code;
        const user_id = req.token !== undefined ? req.row.USER_ID : 'unknown';
        
        // 로그인 성공 여부를 판단하기 위한 변수들
        let loginSuccess = !(req.token === undefined);
        let loginString= loginSuccess ? "success" : "fail";
        console.log("Hello");
        
        stockModel.getOnlyStockInfo(stock_code, (success, stockInfo) => {
            if(success){
                res.render('stock/stock_trade', {
                    title: 'FormanStock',
                    stockInfo: {
                        stockCode: stockInfo.stock_code,
                        companyName: stockInfo.company_name, 
                        totalStockNum: stockInfo.total_stock_num, 
                        companyInfo: stockInfo.company_info
                    },
                    userInfo: {
                        login: loginString,
                        info: loginSuccess ? req.row : 'empty'
                    }
                });
            }
            else{
                // 404를 전송한다.
                res.sendStatus(404);
            }
        })
        
    },
    buyStock: (req, res, next) => {
        const price = req.body.trade_price;
        const num = parseInt(req.body.trade_amount);
        const user_id = req.token !== undefined ? req.row.USER_ID : 'unknown';
        const stock_code = req.params.stock_code;

        // 구매 가능한 경우에는 바로 구매한다.
        console.log(`price: ${price}, num: ${num}`);
        //res.send('hello');
        console.log(`type check: ${typeof(num)}`);

        stockModel.buyStock(user_id, stock_code, num, price, (success) => {
            if(success){
                res.send("buy success");
            }
            else{
                res.send("buy fail");
            }
        })
    },
    sellStock: (req, res, next) => {
        const price = req.body.trade_price;
        const num = req.body.trade_amount;
        const user_id = req.token !== undefined ? req.row.USER_ID : 'unknown';
        const stock_code = req.params.stock_code;

        // 판매 가능한 경우에는 바로 구매한다.
        console.log(`price: ${price}, num: ${num}`);
        //res.send('hello');

        stockModel.sellStock(user_id, stock_code, num, price, (success) => {
            if(success){
                res.send("sell success");
            }
            else{
                res.send("sell fail");
            }
        })
    }
}