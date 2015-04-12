var mysql =require("mysql");
//var cheerio = require("cheerio");
//var debug = require("debug")("blog:update");
exports.db = mysql.createConnection({
    host:"127.0.0.1",
    port:3306,
    database: "crawler",
    user:"root",
    password:"root"
});

exports.sinaBlog = {
    url :"http://blog.sina.com.cn/u/1776757314"
};


