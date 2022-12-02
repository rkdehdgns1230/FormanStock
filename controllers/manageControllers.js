var manage_model = require('../models/manageModel');
var express = require('express');

module.exports={
    getlist_board:function(req,res){     
        const stock_code = req.params.stock_code;   
        console.log("stock_code:" + JSON.stringify(stock_code));
        manage_model.getList_board(stock_code,(rows) =>{
            console.log("rows:" + JSON.stringify(rows));
            res.render('manage/board',{title:'게시물', rows:rows, stock_code:stock_code});
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
    user_suspend:function(req,res){
        const user_id = req.params.user_id;        
        manage_model.user_suspend(user_id,(num) =>{
            console.log("rows:" + JSON.stringify(num));
            res.redirect('/formanstock/manage/users');
        });        
    },
    user_delete:function(req,res){
        const user_id = req.params.user_id;        
        manage_model.user_delete(user_id,(num) =>{
            console.log("rows:" + JSON.stringify(num));
            res.redirect('/formanstock/manage/users');
        });        
    },
    suspended_user_delete:function(req,res){
        const user_id = req.params.user_id;        
        manage_model.user_delete(user_id,(num) =>{
            console.log("rows:" + JSON.stringify(num));
            res.redirect('/formanstock/manage/users-suspension');
        });        
    },
    post_delete:function(req,res){
        const stock_code = req.params.stock_code;        
        const post_no = req.params.post_no;
        manage_model.post_delete(post_no,(num) =>{
            console.log("rows:" + JSON.stringify(num));
            res.redirect('/formanstock/manage/board/'+ stock_code +'');
        });        
    },
    comment_delete:function(req,res){
        const comment_no = req.params.comment_no;                
        manage_model.comment_delete(comment_no,(num) =>{
            console.log("rows:" + JSON.stringify(num));
            res.redirect('/formanstock/manage/board/comments');
        });        
    }, 
    get_company_info:function(req,res){
        const company_name = req.params.company_name;                
        manage_model.get_company_info(company_name,(row) =>{
            console.log("rows:" + JSON.stringify(row));
            res.render('manage/modify-form', {row:row});
        });                 
    },
    update_company:function(req,res){                         
        var stock_code = req.body.stock_code          
        var total_stock_num = req.body.total_stock_num;
        var company_info = req.body.company_info;
        var datas =[parseInt(total_stock_num),
               company_info,               
               stock_code];
        manage_model.update_company(datas,(num) =>{
            console.log("datas:" + JSON.stringify(datas));
            res.redirect('/formanstock/manage/companies');
        });                
    },
    insert_company:function(req,res){                         
        var stock_code = req.body.stock_code          
        var company_name = req.body.company_name          
        var total_stock_num = req.body.total_stock_num;
        var company_info = req.body.company_info;
        var datas =[stock_code,
                company_name,
                stock_code,
               company_name, 
               parseInt(total_stock_num),
               company_info,               
               ];
        manage_model.insert_company(datas,(num) =>{
            console.log("datas:" + JSON.stringify(datas));
            res.redirect('/formanstock/manage/companies');
        });                
    },
}
