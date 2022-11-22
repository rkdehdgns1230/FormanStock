var mysql = require('mysql');
var connection = mysql.createConnection({
    connectionLimit: 5,
    host: 'localhost',
    user: 'root',
    password: '0406',
    database: 'stock_market'
})


module.exports = {insertData(datas, callback){
    var sql = "INSERT INTO USER(USER_ID, USER_PASSWD, USER_REAL_NAME, AGE, AUTHORITY, DELETE_YN, SUSPENSION_YN) VALUES(?,?,?,?,?,?,?)";
    connection.query(sql, datas, function(err, rows){
        if(err) console.error("err : "+err);
        console.log('success');
        callback();
    });
}}