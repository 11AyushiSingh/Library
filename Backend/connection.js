const mysql = require('mysql2');
// const { Connection } = require('mysql2/typings/mysql/lib/Connection');
var mysqlConnection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Mysql@123',
    database: 'bookdb'
    // database: 'signup'
})
 mysqlConnection.connect((err)=>{
    if(err){
        console.log('error in db connection: '+JSON.stringify(err,undefined,2));
    }else{
           console.log('db connected successfully');
    }
})
module.exports = mysqlConnection