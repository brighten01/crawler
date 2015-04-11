var async = require("async");
var read = require("./read");
var config =require("./config");
var save = require("./save");
var debug = require("debug")("blog:update");

var classList = [];
var articleList = [];
async.series([function (done){
        read.classList(config.sinaBlog.url,function (error,result){
            classList = result;
            done(error);
        });
},function (done){

}]);
