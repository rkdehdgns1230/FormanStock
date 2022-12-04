const mysql = require('mysql');
const dbInfo = require('../controllers/config/dev.js');
const connection = mysql.createConnection(dbInfo.mySQL_config);

module.exports = {
    releaseToken: (email, token, callback) => {
        let datas = [token, email];
        const sql = `UPDATE USER SET TOKEN = ? WHERE USER_ID = ?`;
        // token을 초기화한다.
        connection.query(sql, datas, (err, rows) => {
            if(err){
                console.log(err);
                return;
            }
            else{
                callback(true);
            }
        });
    }
}