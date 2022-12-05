var boardModel = require('../models/boardModel');
var express = require('express');
// const dateUtils = require('date-utils');

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

exports.read_post=(req, res, next) => {
    console.log(req.params.post_no)
    console.log('게시글 확인');
    let loginSuccess = !(req.token === undefined);
    let loginString= loginSuccess ? "success" : "fail"; 
    post_no = req.params.post_no;
    user_id = req.row.user_id;
    boardModel.read_post(post_no, (rows)=>{
        console.log("rows:" + JSON.stringify(rows));
        res.render('board/post',{title:'게시물', rows:rows, user_id:user_id, userInfo: {
            login: loginString,
            info: loginSuccess ? req.row : 'empty'
        }});
    });
};
exports.remove_board=(req, res, next)=>{
    console.log(req.params.stock_code, req.params.post_no)
    stock_code = req.params.stock_code
    post_no = req.params.post_no
    boardModel.remove_board(post_no,()=>{
        res.redirect('/formanstock/board/'+ stock_code +'/posts');
    })
};

exports.getUpdatepage=(req, res, next)=>{
    console.log('update 화면 가져오기')
    stock_code = req.params.stock_code;
    post_no = req.params.post_no;
    let loginSuccess = !(req.token === undefined);
    let loginString= loginSuccess ? "success" : "fail"; 
    console.log('--------------------' + JSON.stringify(stock_code))
    res.render('board/edit_form',{title:'FormanStock', rows: {
        stock_code: stock_code,
        post_no: post_no
    }, userInfo: {
        login: loginString,
        info: loginSuccess ? req.row : 'empty'
    },
    token: req.token,});
}

exports.update_board=(req,res,next)=>{
    console.log(req.body)
    console.log('--------------------=-------------------------');
    console.log(req.params.stock_code);
    console.log('게시글 작성');
    let loginSuccess = !(req.token === undefined);
    let loginString= loginSuccess ? "success" : "fail"; 
    Data = req.body;
    stock_code = req.params.stock_code
    post_no = req.params.post_no
    user_id = req.row.USER_ID;
    var newDate = new Date();
    var time = newDate.toFormat('YYYY-MM-DD');
    console.log(user_id)
    boardModel.update_board(stock_code, post_no, user_id, Data, time, (rows)=>{
        console.log("rows:" + JSON.stringify(rows));
        res.redirect('/formanstock/board/'+ stock_code +'/posts');
    });

}