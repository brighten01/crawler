var async = require("async");
var db = require("./config.js").db;
var debug = require("debug")("blog:update:save");

/**
 * 保存文章列表
 * @param list
 * @param callback
 */
exports.classList = function (list,callback){
    debug('保存文章分类列表到数据库中: %d', list.length);
    async.eachSeries(list,function (item ,next){
        db.query("select * from `class_list` where id=? limit 1",[item.id],function (error,data){
            if(error){
                next(error);
            }
            if(Array.isArray(data) && data.length>1){
                db.query("update class_list set name=? , url=? ,class_id=? ,create_time=? where id=? and  class_id=?",
                [item.title,item.url,item.url,class_id,create_time,item.id,class_id],next);
            }else{
                db.query('INSERT INTO `article_list`(`id`, `title`, `url`, `class_id`, `created_time`) VALUES (?, ?, ?, ?, ?)',
                    [item.id, item.title, item.url, class_id, created_time], next);
            }
        });
    });
};
/**
 * 保存文章数量
 * @param class_id
 * @param count
 * @param callback
 */
exports.articleCount = function (class_id ,count ,callback){
  debug("保存文章数量");
    db.query("update class_list set count=? where class_id=?",[count ,class_id],callback);
};

/**
 * 保存文章标签
 * @param id
 * @param tags
 * @param callback
 */
exports.articlTags= function (id,tags,callback){
    db.query("delete from article_tags where id=?"[id],function (error,data){
       if(tas.length >0){
            var values = tags.map(function (tag){
                return '('+db.escape(id)+','+db.escape(tag)+')';
            }).join(',');
           db.query("insert into article_tags (id,tags) values "+values,callback);
       } else{
         callback(null);
       }
    });
};
/**
 * 保存文章内容
 * @param id
 * @param tags
 * @param content
 * @param callback
 */
exports.articleDetail = function (id,tags,content,callback){
    db.query("select id from article_detail where id=?",[id],function (error,data){
        if(error){
            callback(error);
        }
        tags = tags.join(' ');
        if(Array.isArray(data) && data.length>0){
            db.query("update article set tags=? ,content=?  where id=?",[tags,content,id],callback);
        }else{
            db.query("insert into article_detail (id,tags,content) values (? ,? ,?)",[id,content,tags],callback);
        }
    });
};

/**
 * 文章是否存在
 * @param id
 * @param callback
 */
exports.isArticlExists =function (id,callback){
  db.query("select id from article_detail  where id=?",[id],function (error,data){
      callback(null, Array.isArray(data) && data.length >= 1);
  })
};