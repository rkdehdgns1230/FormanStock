const searchModel = require('../models/searchModel');

module.exports = {
    searchStock: (req, res, next) => {
        // GET method를 통해 전달된 parameter는 req 객체의 query member를 통해 접근이 가능하다.
        const search = req.query.query;
        
        searchModel.searchStockList(search, (stockList) => {
            console.log(search);
            // 질의 결과를 클라이언트에게 전송
            res.send(stockList);
        });
    }
}