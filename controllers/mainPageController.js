const mainPageModel = require('../models/mainPageModel');

module.exports = {
    getMainPage: (req, res, next) => { // localhost:3000/formanstock
        // 웹 페이지의 이름과 환영 문구를 템플릿과 합쳐 랜더링한다.
        let loginSuccess = !(req.token === undefined);
        let loginString= loginSuccess ? "success" : "fail";

        // samsung
        let stock_code1 = '005930';
        // lg
        let stock_code2 = '003550';

        console.log(`loginSuccess: ${loginSuccess}`);
        
        mainPageModel.getMainPage(stock_code1, stock_code2, (stockList1, stockList2, postList, mostLikedStock, top10Trader) => {
            let closePriceList1 = new Array();
            let closePriceList2 = new Array();

            let dateList1 = new Array();
            let dateList2 = new Array();

            // 리스트에 append 해준다.
            for(let i = 0; i < stockList1.length; i++){
                closePriceList1.push(stockList1[i].close_price);
                dateList1.push(stockList1[i].stock_date);
            }

            // 리스트에 append 해준다.
            for(let i = 0; i < stockList2.length; i++){
                closePriceList2.push(stockList2[i].close_price);
                dateList2.push(stockList2[i].stock_date);
            }
            console.log(postList[0]);
            //console.log(mostLikedStock[0].stock_code);
            res.render('index', {
                title: 'FormanStock',
                welcome_comment: "KOSPI 주식 종목 거래와 종목 토론 서비스를 이용해 보세요!!",
                userInfo: {
                    login: loginString,
                    info: loginSuccess ? req.row : 'empty'
                },
                token: req.token,
                // 두 개 종목의 가격 리스트를 보내준다.
                stockClosePriceListSamsung: closePriceList1,
                stockDateListSamsung: dateList1,
                stockClosePriceListLg: closePriceList2,
                stockDateListLG: dateList2,
                postList: postList,
                mostLikedStock: mostLikedStock,
                topTrader: top10Trader
            });
        });
    }
}