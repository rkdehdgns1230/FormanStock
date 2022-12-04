var boardModel = require('../models/boardModel')
var express = require('express')

exports.getPage=(req, res, next) => {
    console.log('게시글 페이지');
    res.render('board/index',{title: '게시판'});
};
