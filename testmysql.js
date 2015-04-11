//var mysql = require("mysql");
//var connection = mysql.createConnection({
//    host: 'localhost',
//    user : "root",
//    password: "root"
//});
//connection.connect();
//connection.query("select 1+1 as solution",function (error,rows){
//    if(error){
//        throw error;
//    }
//    console.log("the solution is "+rows[0].solution);
//});
//var dbconfig = {
//    user: "root",
//    password: "root",
//    database: "crawler",
//    host: "localhost"
//}
//
//var handleConnect = function () {
//    var mysql = require("mysql");
//    var connection = mysql.createConnection(dbconfig);
//    connection.connect(function (error) {
//        if (error) {
//            console.log("连接数据库出错" + error);
//            setTimeout(handleConnect, 2000);
//        }else{
//            //todo
//            console.log("连接成功");
//        }
//
//    });
//    connection.on ("error",function (err){
//        console.log("出错"+err);
//        if(err.code=='PROTOCOL_CONNECTION_LOST'){
//            handleConnect();
//        }else{
//            throw err;
//        }
//    });
//}
//
//handleConnect();
//
//var mysql = require("mysql");
//var pool = mysql.createPool ({
//    host : "localhost",
//    user: "root",
//    password : "root",
//    database : "crawler",
//    connectionLimit : 10
//});
//
//pool.getConnection(function (err,connection){
//    if(err){
//        throw err;
//    }
//});

var async = require("async");

async.series([function (done){
    console.log(1);
        done();
},
function (done){
    console.log(2);
    done();
},
function (done){
    console.log(3);
    done();
}],function (err){
    console.log("完成");
});