var boardModel = require('../models/boardModel')
var express = require('express')

exports.getPage=(req, res, next) => {
    console.log(req.params.stock_code)
    console.log('게시글 페이지');
    let loginSuccess = !(req.token === undefined);
    let loginString= loginSuccess ? "success" : "fail"; 

    boardModel.getPosts(req.params.stock_code, (rows)=>{
        console.log("rows:" + JSON.stringify(rows));
        res.render('board',{title:'게시물', rows:rows, userInfo: {
            login: loginString,
            info: loginSuccess ? req.row : 'empty'
        }});
    });
};
