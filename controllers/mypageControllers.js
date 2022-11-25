var mypage_model = require('../models/mypageModel');
var express = require('express');

module.exports={
    get_userINFO:function(req,res){     
        // const user_id = req.params.id;   
        const user_id = 'kkw7674'; 
        console.log("id:" + JSON.stringify(user_id));
        mypage_model.get_userINFO(user_id,(rows) =>{
            console.log("rows:" + JSON.stringify(rows));
            res.render('mypage/index',{title:'유저 정보', rows:rows});
        });        
    },
    // get_HoldINFO:function(req,res){     
    //     // const user_id = req.params.id;   
    //     const user_id = 'kkw7674';  
    //     console.log("hold id:" + JSON.stringify(user_id));
    //     mypage_model.get_HoldINFO(user_id,(rows) =>{
    //         console.log("rows:" + JSON.stringify(rows));
    //         res.render('mypage/hold',{title:'관심 정보', rows:rows});
    //     });        
    // },
    // getlist_company:function(req,res){        
    //     manage_model.getList_company((rows) =>{
    //         console.log("rows:" + JSON.stringify(rows));
    //         res.render('manage/company',{title:'회사', rows:rows});
    //     });        
    // },
    // getlist_users_suspension:function(req,res){        
    //     manage_model.getlist_users_suspension((rows) =>{
    //         console.log("rows:" + JSON.stringify(rows));
    //         res.render('manage/users-suspension',{title:'정지 회원 목록', rows:rows});
    //     });        
    // },
    // getlist_users:function(req,res){        
    //     manage_model.getlist_users((rows) =>{
    //         console.log("rows:" + JSON.stringify(rows));
    //         res.render('manage/users',{title:'정상 회원 목록', rows:rows});
    //     });        
    // },
    // getlist_comments:function(req,res){        
    //     manage_model.getList_comments((rows) =>{
    //         console.log("rows:" + JSON.stringify(rows));
    //         res.render('manage/comments',{title:'댓글', rows:rows});
    //     });        
    // },
    // getlist_stock_code:function(req,res){        
    //     manage_model.getlist_stock_code((stocks) =>{
    //         console.log("rows:" + JSON.stringify(stocks));
    //         res.render('manage/companies',{title:'회사', stocks:stocks});
    //     });        
    // },
    
}
