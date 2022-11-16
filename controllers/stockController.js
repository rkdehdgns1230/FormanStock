const stockModel = require('../models/stockModel');

module.exports = {
    getSpecificStockInfo: (req, res, next) => {
        // 종목 코드는 path parameter 형태로 넘어온다.
        const stock_code = req.params.stock_code;

        stockModel.getSpecificStockInfo(stock_code, (stockInfo, stockPriceInfo) => {
            res.send([stockInfo, stockPriceInfo]);
            /*
            res.render('board/stock_info', {
                stockInfo: stockInfo,
                stockPriceInfo: stockPriceInfo
            });
            */
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

    }
}