const stockModel = require('../models/stockModel');

module.exports = {
    getSpecificStockInfo: (req, res, next) => {
        // 종목 코드는 path parameter 형태로 넘어온다.
        const stock_code = req.params.stock_code;

        stockModel.getSpecificStockInfo(stock_code, (stockInfo, stockPriceInfo) => {
            //res.send([stockInfo, stockPriceInfo]);
            // stock_info template과 data를 결합해 rendering한다.
            console.log(stockPriceInfo[0].close_price);

            // 종가 가격 리스트와 그에 맞는 날짜 정보 리스트 형태로 데이터를 변환해서 view component(template)로 넘겨준다.
            let dateList = new Array();
            let closePriceList = new Array();
            // 리스트에 append 해준다.
            for(let i = 0; i < stockPriceInfo.length; i++){
                dateList.push(String(stockPriceInfo[i].stock_date));
                closePriceList.push(stockPriceInfo[i].close_price);
            }
            console.log(dateList.length, closePriceList.length);
            console.log(stockInfo[0].stock_code);
            // template과 data를 합쳐서 rendering 한다.
            res.render('board/stock_info', {
                title: 'FormanStock',
                stockInfo: {
                    stockCode: stockInfo[0].stock_code,
                    companyName: stockInfo[0].company_name, 
                    totalStockNum: stockInfo[0].total_stock_num, 
                    companyInfo: stockInfo[0].company_info,
                    like: 12,
                    interest: 100
                },
                userInfo: {
                    like: false, // 일단 false로
                    interest: false
                },
                stockDateList: dateList,
                stockClosePriceList: closePriceList,
                listLength: dateList.length
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
    
}