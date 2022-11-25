var express = require('express')
var loginPageModel = require('../models/loginPageModel')

exports.getPage=(req, res, next) => {
    console.log('로그인 페이지')
    res.render('login-page',{title: 'login'});
}

exports.login=(req, res, next) => {
    console.log('로그인 수행')
    var email = req.body.email
    var password = req.body.password
    console.log(req.body)
    console.log(email, password)
    var datas = [email, password];
    //console.log(req.body)
    loginPageModel.checkUser(req, res, datas, ()=>{
        res.redirect('/');
    });

}