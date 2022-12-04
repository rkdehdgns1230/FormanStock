const searchModel = require('../models/searchModel');

module.exports = {
    searchStock: (req, res, next) => {
        // GET method를 통해 전달된 parameter는 req 객체의 query member를 통해 접근이 가능하다.
        const search = req.query.query;
        let loginSuccess = !(req.token === undefined);
        let loginString= loginSuccess ? "success" : "fail";

        searchModel.searchStockList(search, (stockList) => {
            console.log(search);
            // 질의 결과를 클라이언트에게 전송
            //res.send(stockList);
            res.render('search', {
                rows: stockList,
                title: 'FormanStock',
                query: search,
                userInfo: {
                    login: loginString,
                    info: loginSuccess ? req.row : 'empty'
                },
            });
        });
    }
}