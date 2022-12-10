const mysql = require('mysql');
const dbInfo = require('../controllers/config/dev.js');
const connection = mysql.createConnection(dbInfo.mySQL_config);

exports.write_board=(stock_code, user_id, Data, time, callback)=>{
    const sql = `INSERT INTO post(POST_TITLE, POST_CONTENT, USER_ID, REG_DATE, STOCK_CODE, DELETE_YN) VALUES(?, ?, ?, ?, ?, 'n');`;
    console.log(stock_code)
    console.log('게시글 페이지');
    connection.query(sql,[Data['POST_TITLE'], Data['POST_CONTENT'], user_id, time, stock_code],(err,rows,fields)=>{
        if(err) throw err;
        callback(rows);
    });
}    
exports.read_post=(post_no, callback)=>{
    console.log(post_no)
    const sql = `
    SELECT POST_NO, POST_TITLE, POST_CONTENT, USER_ID, date_format(REG_DATE,'%Y-%m-%d') as REG_DATE, STOCK_CODE FROM POST WHERE POST_NO = ?;
    select comment_no, post_no, user_id, comment_content, date_format(reg_date,'%Y-%m-%d') reg_date 
    from comment
    where post_no = ? and delete_yn = 'n'; 
    `; 

    connection.query(sql,[post_no,post_no],(err,rows,fields)=>{
        if(err) throw err;
        callback(rows);
    });
}    

exports.getPosts=(stock_code, callback)=>{
    console.log('in getPosts')
    const sql = `SELECT * FROM STOCK; SELECT POST_NO, POST_TITLE, POST_CONTENT, USER_ID, date_format(REG_DATE,'%Y-%m-%d') as REG_DATE, STOCK_CODE FROM POST WHERE DELETE_YN = 'n' AND STOCK_CODE = ?;
    select stock_name from stock where stock_code =?`;
    var data = [stock_code, stock_code]
    console.log('data:', data)
    connection.query(sql,data,(err, rows, fileds)=>{
        if(err) throw err;
        console.log(rows[2][0].stock_name)
        callback(rows)
    });
}

// AND DELETE_YN = 'n'
exports.remove_board=(post_no, callback)=>{
    // const sql = 'DELETE FROM POST WHERE POST_NO=?; SELECT * FROM STOCK;'
    const sql = `UPDATE POST SET DELETE_YN = 'y' WHERE POST_NO=?; SELECT * FROM STOCK;`
    var data = [post_no]
    console.log(data)
    connection.query(sql,data,(err, fileds)=>{
        if(err) throw err;
        callback()
        });
}

exports.update_board=(stock_code, post_no, user_id, Data, time, callback)=>{
    const sql = `UPDATE POST SET POST_TITLE=?, POST_CONTENT=?, REG_DATE=? WHERE post_no = ?; SELECT * FROM STOCK;`;
    connection.query(sql,[Data['POST_TITLE'], Data['POST_CONTENT'], time, post_no],(err,rows,fields)=>{
        if(err) throw err;
        callback(rows);
    });
}

exports.reply_board=(stock_code, post_no, user_id, Data, time, callback)=>{
    const sql = `INSERT INTO comment(POST_NO, USER_ID, COMMENT_CONTENT, REG_DATE, DELETE_YN) VALUES(?, ?, ?, ?, 'n');`;
    connection.query(sql,[post_no, user_id, Data['COMMENT'], time, ],(err,rows,fields)=>{
        if(err) throw err;
        callback(rows);
    });
}
// exports.getList_company=(callback)=>{
//     const sql = `select * from company; select * from stock;`;
//     connection.query(sql,(err,rows,fields)=>{
//         if(err) throw err;
//         callback(rows);
//        }); 
//     }
// exports.getList_board=(stock_code,callback)=>{
//     const sql = `select p.post_no, c.company_name, p.post_title, p.post_content, p.user_id, date_format(p.reg_date,'%Y-%m-%d') reg_date
//     from company c, post p
//     where c.stock_code = p.stock_code and c.stock_code = ?
//     and p.delete_yn = 'n'; select * from stock;`;

//     connection.query(sql,stock_code,(err,rows,fields)=>{
//         if(err) throw err;
//         callback(rows);
//        });
//     }
// exports.getlist_users=(callback)=>{
//     const sql = `select * from user
//                  where suspension_yn = 'n' 
//                  and delete_yn = 'n'; select * from stock;`;

//     connection.query(sql,(err,rows,fields)=>{
//         if(err) throw err;
//         callback(rows);
//        });
//     }    
// exports.getlist_users_suspension=(callback)=>{
//     const sql = `select * from user
//                  where suspension_yn = 'y' 
//                  and delete_yn = 'n'; select * from stock;`;

//     connection.query(sql,(err,rows,fields)=>{
//         if(err) throw err;
//         callback(rows);
//        });
//     }   
// exports.getList_comments=(callback)=>{
//     const sql = `select comment_no, post_no, user_id, comment_content, date_format(reg_date,'%Y-%m-%d') reg_date 
//                  from comment
//                  where delete_yn = 'n'; select * from stock;`;

//     connection.query(sql,(err,rows,fields)=>{
//         if(err) throw err;
//         callback(rows);
//        }); 
//     } 
// exports.user_suspend=(user_id,callback)=>{
//     const sql = `update user set suspension_yn = 'y' where user_id = ?;`;

//     connection.query(sql,user_id,(err,rows,fields)=>{
//         if(err) throw err;
//         callback(rows);
//        });
//     }   
// exports.user_delete=(user_id,callback)=>{
//     const sql = `update user set delete_yn = 'y' where user_id = ?;`;

//     connection.query(sql,user_id,(err,rows,fields)=>{
//         if(err) throw err;
//         callback(rows);
//        });
//     }     
// exports.post_delete=(post_no,callback)=>{
//     const sql = `update post set delete_yn = 'y' where post_no = ?;`;

//     connection.query(sql,post_no,(err,rows,fields)=>{
//         if(err) throw err;
//         callback(rows);
//        });
//     }    
// exports.comment_delete=(comment_no,callback)=>{
//     const sql = `update comment set delete_yn = 'y' where comment_no = ?;`;

//     connection.query(sql,comment_no,(err,rows,fields)=>{
//         if(err) throw err;
//         callback(rows);
//        });
//     }
// exports.get_company_info=(company_name,callback)=>{
//     const sql = `select * from company where company_name = ?;`;

//     connection.query(sql,company_name,(err,row,fields)=>{
//         if(err) throw err;
//         callback(row);
//        }); 
//     }
// exports.update_company=(datas,callback)=>{
//     const sql = `update company set total_stock_num = ?,
//                  company_info = ?
//                  where stock_code = ?;`;
//     console.log("datas:" + datas);
//     connection.query(sql,datas,(err,row,fields)=>{
//         if(err) throw err;
//         callback(row);
//        });
//     }    
// exports.insert_company=(datas,callback)=>{
//     const sql = `INSERT INTO STOCK(stock_code, stock_name) VALUES(?,?);
//     INSERT INTO COMPANY(stock_code, company_name, total_stock_num, company_info) VALUES(?,?,?,?);`;
    
//     console.log("datas:" + datas);
//     connection.query(sql,datas,(err,row,fields)=>{
//         if(err) throw err;
//         callback(row);
//        });
//     }        
    
