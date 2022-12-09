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

}
