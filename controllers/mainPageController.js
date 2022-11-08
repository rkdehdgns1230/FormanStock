const mainPageModel = require('../models/mainPageModel');

module.exports = {
    getStockList: (req, res, next) => {
        mainPageModel.getStockList((rows) => {
            // template에 sql 결과를 전달해서 새로운 page rendering.
            res.render('', {
                'stocks': rows
            });
        })
    }
}