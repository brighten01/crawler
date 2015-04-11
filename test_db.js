var cheerio  = require("cheerio");
var request = require("request");
var debug = require("debug")("blog:update");
var mysql = require("mysql");
var db = mysql.createConnection(
    {
        user:"root",
        password :"root",
        database: "crawler",
        host :"127.0.0.1"
    }
);

db.query("show tables ",function (error,tables){
    if(error){
        console.log("error: "+error);
    }else{
        console.log(tables);
    }
})
