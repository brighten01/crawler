var mysql =require("mysql");
//var cheerio = require("cheerio");
//var debug = require("debug")("blog:update");
var db = mysql.createConnection({
    user:"root",
    password:"root",
    host:"127.0.0.1",
    database: "crawler"
});
exports.db=  db;

exports.sinaBlog = {
    url :"http://blog.sina.com.cn/u/1776757314"
};


