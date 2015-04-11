var cheerio= require("cheerio");
var request = require("request");
var debug = require("debug")("blog:update");
//var url = "http://blog.sina.com.cn/u/1271538665";
request("http://blog.sina.com.cn/u/1776757314",function (error,response){
    if(error){
        console.log(error);
    }
    var $ = cheerio.load(response.body.toString());
    var classList = [];
    // each 中是同步？

    $('.classList li a').each(function (index ,data) {
        //此处需要修改
        //    console.log(data.children[0].data);
        //    console.log(data.attribs.href);
        var $me = $(this);

        var item = {
            name: data.children[0].data.trim(),
            url: data.attribs.href
        };
        var s = item.url.match(/articlelist_\d+_(\d+)_\d\.html/);
        if (Array.isArray(s)) {
            item.id = s[1];
            classList.push(item);
        }
        console.log(classList);
    });
});