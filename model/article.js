var db = require("../config.js").db;
function Article(){
}
/**
 * 显示文章列表
 */
Article.prototype.show_article_list= function (callback){
    db.query("select * from article_list where class_id >0 limit 10",function (error,data){
        if(error){
            return callback(error);
        }
        callback(null,data);
    })
}

/**
 * 显示文章类别
 */
Article.prototype.categories =function (callback){
    db.query("select * from class_list ",function (error,data){
        if(error){
            return callback(error);
        }
        callback(null ,data);
    });
}


/**
 * 显示文章信息
 */

Article.show_detail= function (article_id , callback){
    db.query("select a.content ,b.id ,b.title from article_detail a , article_list b where a.id=b.id and a.id='"+article_id+"'" ,function (error,data){
        if(error){
            return callback(error);
        }
        callback(null , data);
    });
}

module.exports = Article;