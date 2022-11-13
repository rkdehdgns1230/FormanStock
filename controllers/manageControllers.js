var manage_model = require('../models/manageModel');
var express = require('express');

module.exports={
    getlist_board:function(req,res){        
        manage_model.getList_board((rows) =>{
            console.log("rows:" + JSON.stringify(rows));
            res.render('manage/board',{title:'게시물', rows:rows});
        });        
    },
    getlist_company:function(req,res){        
        manage_model.getList_company((rows) =>{
            console.log("rows:" + JSON.stringify(rows));
            res.render('manage/company',{title:'회사', rows:rows});
        });        
    },
    getlist_users_suspension:function(req,res){        
        manage_model.getlist_users_suspension((rows) =>{
            console.log("rows:" + JSON.stringify(rows));
            res.render('manage/users-suspension',{title:'정지 회원 목록', rows:rows});
        });        
    },
    getlist_users:function(req,res){        
        manage_model.getlist_users((rows) =>{
            console.log("rows:" + JSON.stringify(rows));
            res.render('manage/users',{title:'정상 회원 목록', rows:rows});
        });        
    },
    getlist_comments:function(req,res){        
        manage_model.getList_comments((rows) =>{
            console.log("rows:" + JSON.stringify(rows));
            res.render('manage/comments',{title:'댓글', rows:rows});
        });        
    },
    
}
