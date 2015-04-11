var request = require("request");
var cheerio = require("cheerio");
var url="http://blog.sina.com.cn/s/articlelist_1776757314_0_1.html";
function readArticleList(url ,callback) {
    request(url, function (error, res) {

        if (error) {
            console.log(error);
        }
        var $ = cheerio.load(res.body.toString());
        var articleList = [];
        $(".articleList .articleCell").each(function () {
            var $me = $(this);
            var $title = $me.find(".atc_title a");
            var $time = $me.find(".atc_tm");
            var item = {
                title: $title.text().trim,
                url: $title.attr("href"),
                time: $time.text().trim()
            };

            var s = item.url.match(/blog_([a-zA-Z0-9]+)\.html/);
            if (Array.isArray(s)) {
                item.id = s[1];
                articleList.push(s);
            }
            var nextUrl = $(".SG_pnext a").attr("href");
            if (nextUrl) {
                readArticleList(nextUrl, function (error, articleItem) {
                    if (error) {
                        return callback(error);
                    }
                    callback(null, articleList.concat(articleItem));
                });
            } else {
                callback(null, articleList);
            }
        });

    });
}

readArticleList('http://blog.sina.com.cn/s/articlelist_1776757314_0_1.html', function (err, articleList) {
    if (err) console.error(err.stack);
    console.log(articleList);
});