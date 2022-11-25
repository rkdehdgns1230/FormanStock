var express = require('express')
var signUpPageModel = require('../models/signUpPageModel')

//비밀번호 암호화
const bcrypt = require('bcrypt');
const saltRounds = 10

exports.getPage=(req, res, next) => {
    console.log('회원가입 페이지');
    res.render('signup-page',{title: 'sign up'});
}

exports.signUp=(req, res, next) => {
    var email = req.body.email
    var name = req.body.name
    var password = req.body.password
    var age = req.body.age
    var authority = 'USER'
    var delete_yn = 'N'
    var suspension_yn = 'N'
    console.log(req.body)
    
    //console.log(req.body)
    
    bcrypt.genSalt(saltRounds, function(err,salt){
        if (err) console.error("bcrypt err: " + err);
        bcrypt.hash(password, salt, function(err, hash){
            if (err) console.error("bcrypt err: " + err);
            password = hash
            console.log(password)
            var datas = [email, password, name, age, authority, delete_yn, suspension_yn];

            signUpPageModel.insertData(datas, ()=>{
                res.redirect('/login-page');
            });
        })
    })
    
}