var manage_model = require('../models/manageModel');
var express = require('express');

module.exports={
    getlist_company:function(req,res){
        res.render('manage/index',{title:'company'});
    }
}
