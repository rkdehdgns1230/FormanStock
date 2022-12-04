var mypage_model = require('../models/mypageModel');
var express = require('express');

module.exports={
    get_userINFO:function(req,res){     
        console.log("============================")       
        let loginSuccess = !(req.token === undefined);
        let loginString= loginSuccess ? "success" : "fail"; 
        const user_id = req.row.USER_ID;   
        console.log("id:" + JSON.stringify(user_id));
        mypage_model.get_userINFO(user_id,(rows) =>{
            console.log("rows:" + JSON.stringify(rows));
            res.render('mypage/index',
                {title:'FormanStock', 
                rows:rows, 
                user_id:user_id, 
                userInfo: {
                    login: loginString,
                    info: loginSuccess ? req.row : 'empty'
                },
                token: req.token,
            });
        });        
    },
    ChangePW:function(req,res){     
        const user_id = req.row.USER_ID;    
        console.log("PW Test" + JSON.stringify(req.body));
        console.log("user_id" + JSON.stringify(user_id));
        console.log("--------------------------")
        Data = req.body

        mypage_model.ChangePW(req, res, Data ,(callback) =>{
            console.log("ChangePW end" + JSON.stringify(callback));
            if (callback == 0)res.send("<script>alert('비밀번호가 틀렸습니다.');window.location=\"/formanstock/mypage\";</script>");
            else if (callback == 1)res.send("<script>alert('변경할 비밀번호가 서로 일치하지 않습니다.');window.location=\"/formanstock/mypage\";</script>");
            else if (callback == 2)res.send("<script>alert('비밀번호 변경이 완료되었습니다.');window.location=\"/formanstock/mypage\";</script>");
        });      
    },

    // user_suspend:function(req,res){
    //     const user_id = req.params.user_id;        
    //     manage_model.user_suspend(user_id,(num) =>{
    //         console.log("rows:" + JSON.stringify(num));
    //         res.redirect('/formanstock/manage/users');
    //     });        
    // },
    // user_delete:function(req,res){
    //     const user_id = req.params.user_id;        
    //     manage_model.user_delete(user_id,(num) =>{
    //         console.log("rows:" + JSON.stringify(num));
    //         res.redirect('/formanstock/manage/users');
    //     });        
    // },
    // suspended_user_delete:function(req,res){
    //     const user_id = req.params.user_id;        
    //     manage_model.user_delete(user_id,(num) =>{
    //         console.log("rows:" + JSON.stringify(num));
    //         res.redirect('/formanstock/manage/users-suspension');
    //     });        
    // },
    // post_delete:function(req,res){
    //     const stock_code = req.params.stock_code;        
    //     const post_no = req.params.post_no;
    //     manage_model.post_delete(post_no,(num) =>{
    //         console.log("rows:" + JSON.stringify(num));
    //         res.redirect('/formanstock/manage/board/'+ stock_code +'');
    //     });        
    // },
    // comment_delete:function(req,res){
    //     const comment_no = req.params.comment_no;                
    //     manage_model.comment_delete(comment_no,(num) =>{
    //         console.log("rows:" + JSON.stringify(num));
    //         res.redirect('/formanstock/manage/board/comments');
    //     });        
    // },
    
}
