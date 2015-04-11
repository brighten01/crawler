var cheerio = require("cheerio");
var  originRequest  = require("request");
var debug = require("debug")("blog:update:read");
function request(url,callback){
    originRequest (url,callback);
}

exports.classList = function (url,callback){
 request(url,function (error,res){
    if(error){
        console.log(error);
    }

     var classList = [];
     var $ = cheerio.load(res.body.toString());
     $(".classList li a").each(function (){
         var $me = $(this);
         var item = {
           name : $me.text().trim(),
             url : $me.attr("href")
         };
         var s = item.url.match(/articlelist_\d_(\d+)_\d\.html/);
         if(Array.isArray(s)){
             item.id = s[1];
             classList.push(item);
         }
         callback(null,classList);
     });
 });
};

exports.articleList =function (url,callback){
    request(url,function (error,res){
        if(error){
            console.log(error);
        }
        var $ = cheerio.load(res.body.toString());
        var articleList = [];
        $(".articleList .articleCell").each(function (){
            var $me  = $(this);
            var $title = $me.find(".atc_title a");
            var $time = $me.find(".atc_tm");
            var item = {
                title :$title.text().trim(),
                url : $title.attr("href"),
                time:$time.text().trim()
            };
            var s = item.url.match(/blog_([a-zA-Z0-9]+)\.html/);
            if(Array.isArray(s)) {
                item.id = s[1];
                articleList.push(item);
            }
            var nextUrl =  $('.SG_pgnext a').attr('href');
            exports.articleList(nextUrl,function (error,article_list){
                if(error){
                    return callback(error);
                }
                callback(null ,article_list);
            });

        });
    });

};

exports.articleDetail = function (url, callback) {
    debug('读取博文内容：%s', url);

    request(url, function (err, res) {
        if (err) return callback(err);

        // 根据网页内容创建DOM操作对象
        var $ = cheerio.load(res.body.toString());

        // 获取文章标签
        var tags = [];
        $('.blog_tag h3 a').each(function () {
            var tag = $(this).text().trim();
            if (tag) {
                tags.push(tag);
            }
        });

        // 获取文章内容
        var content = $('.articalContent').html().trim();

        // 返回结果
        callback(null, {tags: tags, content: content});
    });
};



