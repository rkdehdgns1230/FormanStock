const stockModel = require('../models/stockModel');

module.exports = {
    getSpecificStockInfo: (req, res, next) => {
        // 종목 코드는 path parameter 형태로 넘어온다.
        const stock_code = req.params.stock_code;
        const user_id = req.token !== undefined ? req.row.USER_ID : 'unknown';
        console.log("살려줘 ~~~~~~~~~~~~~~~~");
        stockModel.getSpecificStockInfo(user_id, stock_code, (stockInfo, stockPriceInfo, likeCount, userLike) => {
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
            res.render('board/stock_info', {
                title: 'FormanStock',
                stockInfo: {
                    stockCode: stockInfo[0].stock_code,
                    companyName: stockInfo[0].company_name, 
                    totalStockNum: stockInfo[0].total_stock_num, 
                    companyInfo: stockInfo[0].company_info,
                    like: likeCount.like_count,
                    interest: 100
                },
                userInfo: {
                    like: userLike != 0 ? true : false, // 좋아요 누른 기록 없으면 0
                    interest: false,
                    login: loginString,
                    info: loginSuccess ? req.row : 'empty'
                },
                stockDateList: dateList,
                stockClosePriceList: closePriceList,
                listLength: dateList.length,
                token: req.token
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

    },
    excludeInterestInStock: (req, res, next) => {
        
    }
}