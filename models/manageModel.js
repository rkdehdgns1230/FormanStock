const mysql = require('mysql');
const dbInfo = require('../controllers/config/dev.js');
const connection = mysql.createConnection(dbInfo.mySQL_config);

exports.getList_company=(callback)=>{
    const sql = `select * from company; select * from stock;`;
    connection.query(sql,(err,rows,fields)=>{
        if(err) throw err;
        callback(rows);
       });
    }
exports.getList_board=(stock_code,callback)=>{
    const sql = `select c.company_name, p.post_title, p.post_content, p.user_id, date_format(p.reg_date,'%Y-%m-%d') reg_date
    from company c, post p
    where c.stock_code = p.stock_code and c.stock_code = ?;
    select * from stock;`;

    connection.query(sql,stock_code,(err,rows,fields)=>{
        if(err) throw err;
        callback(rows);
       });
    }
exports.getlist_users=(callback)=>{
    const sql = `select * from user
                 where suspension_yn = 'n' 
                 and delete_yn = 'n'; select * from stock;`;

    connection.query(sql,(err,rows,fields)=>{
        if(err) throw err;
        callback(rows);
       });
    }    
exports.getlist_users_suspension=(callback)=>{
    const sql = `select * from user
                 where suspension_yn = 'y' 
                 and delete_yn = 'n'; select * from stock;`;

    connection.query(sql,(err,rows,fields)=>{
        if(err) throw err;
        callback(rows);
       });
    }   
exports.getList_comments=(callback)=>{
    const sql = `select post_no, user_id, comment_content, date_format(reg_date,'%Y-%m-%d') reg_date 
                 from comment
                 where delete_yn = 'n'; select * from stock;`;

    connection.query(sql,(err,rows,fields)=>{
        if(err) throw err;
        callback(rows);
       });
    } 
    
