var async = require("async");
var db = require("./config.js").db;
var debug = require("debug")("blog:update:save");

/**
 * 保存文章分类
 * @param list
 * @param callback
 */
exports.classList = function (list,callback){
    debug('保存文章分类列表到数据库中: %d', list.length);
    //console.log(list);
    async.eachSeries(list,function (item ,next){
        db.query("select * from `class_list` where id=? limit 1",[item.id],function (error,data){
            if(error){
                next(error);
            }
            console.log( data.length);
            if(Array.isArray(data) && data.length>=1){
                db.query("update class_list set name=? , url=?  where id=?",
                [item.name,item.url,item.id],next);
            }else{
                    db.query('INSERT INTO `class_list`(`id`, `name`, `url`) VALUES (?, ?, ?)',
                        [item.id, item.name, item.url],next);
            }
        });
    },callback);
};

//保存文章列表
exports.articleList = function (class_id, list, callback) {
    debug('保存文章列表到数据库中: %d, %d', class_id, list.length);
    async.eachSeries(list, function (item ,next) {
        db.query('SELECT * FROM `article_list` WHERE `id`=? AND `class_id`=? LIMIT 1',
            [item.id, class_id], function (err, data) {
                if (err) {
                    return next(err);
                }
                // 将发布时间转成时间戳（秒）
                var created_time = new Date(item.time).getTime() / 1000;
                if (Array.isArray(data) && data.length >= 1) {
                    db.query('UPDATE `article_list` SET `title`=?, `url`=?, `class_id`=?, `created_time`=? WHERE `id`=? AND `class_id`=?',
                        [item.title, item.url, class_id, created_time, item.id, class_id], next);
                } else {
                    if(class_id!==0){
                        db.query('INSERT INTO `article_list`(`id`, `title`, `url`, `class_id`, `created_time`) VALUES (?, ?, ?, ?, ?)',
                            [item.id, item.title, item.url, class_id, created_time], next);
                    }
                }
            });

    }, callback);
};
/**
 * 保存文章数量
 * @param class_id
 * @param count
 * @param callback
 */
exports.articleCount = function (class_id ,count ,callback){
    debug("开始更新文章数量%d 文章类别id %d ",count ,class_id);
    db.query("update class_list set count=? where id=?",[count ,class_id],callback);
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
            db.query("insert into article_detail (id,tags,content) values (? ,? ,?)",[id,tags,content],callback);
        }
    });
};

exports.articleTags = function (id, tags, callback) {
    debug('保存文章标签: %s, %s', id, tags);
    // 删除旧的标签信息
    db.query('DELETE FROM `article_tag` WHERE `id`=?', [id], function (err) {
        if (err) return callback(err);
        if (tags.length > 0) {
            // 添加新标签信息
            // 生成SQL代码
            var values = tags.map(function (tag) {
                return '(' + db.escape(id) + ', ' + db.escape(tag) + ')';
            }).join(', ');

            db.query('INSERT INTO `article_tag`(`id`, `tags`) VALUES ' + values, callback);
        } else {
            // 如果没有标签，直接返回
            callback(null);
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