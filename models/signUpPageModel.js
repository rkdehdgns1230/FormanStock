const mysql = require('mysql');
const dbInfo = require('../controllers/config/dev.js');

const connection = mysql.createConnection(dbInfo.mySQL_config);


module.exports = {insertData(datas, callback){
    var sql = "INSERT INTO USER(USER_ID, USER_PASSWD, USER_REAL_NAME, AGE, AUTHORITY, DELETE_YN, SUSPENSION_YN) VALUES(?,?,?,?,?,?,?)";
    connection.query(sql, datas, function(err, rows){
        if(err) console.error("err : "+err);
        console.log('success');
        callback();
    });
}}