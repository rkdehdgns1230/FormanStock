var boardModel = require('../models/boardModel')
var express = require('express')
require('date-utils')

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
exports.read_board=(req, res, next) => {
    stock_code = req.params.stock_code;
    let loginSuccess = !(req.token === undefined);
    let loginString= loginSuccess ? "success" : "fail"; 
    console.log('--------------------' + JSON.stringify(stock_code))
    res.render('board/write_form',{title:'FormanStock', rows:stock_code, userInfo: {
        login: loginString,
        info: loginSuccess ? req.row : 'empty'
    },
    token: req.token,});
};

exports.write_board=(req, res, next) => {
    console.log('--------------------=-------------------------');
    console.log(req.params.stock_code);
    console.log('게시글 작성');
    let loginSuccess = !(req.token === undefined);
    let loginString= loginSuccess ? "success" : "fail"; 
    Data = req.body;
    stock_code = req.params.stock_code
    user_id = req.row.USER_ID;
    var newDate = new Date();
    var time = newDate.toFormat('YYYY-MM-DD');
    console.log(user_id)
    boardModel.write_board(stock_code, user_id, Data, time, (rows)=>{
        console.log("rows:" + JSON.stringify(rows));
        res.redirect('/formanstock/board/'+ stock_code +'/posts');
    });
};
