var cheerio  = require("cheerio");
var request = require("request");
var debug = require("debug")("blog:update");
var mysql = require("mysql");
var db = mysql.createConnection({
    host:"127.0.0.1",
    port:3306,
    database: "crawler",
    user:"root",
    password:"root"
});

//db.query("show tables ",function (error,tables){
//    if(error){
//        console.log("error: "+error);
//    }else{
//        console.log(tables);
//    }
//
//})
db.query("insert into class_list(id,url,name) values (? ,? ,?)",[1,'asdf','sadfasfdsadfsafd'],function (error,data){
    console.log(data);
});

