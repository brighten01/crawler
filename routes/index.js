var Article = require("../model/article.js");
module.exports=function (app){
    //首页抓取文章
    app.get("/",function (req,res){
        var new_article = new  Article();
        new_article.categories(function (error,category_list) {
            if(error) {
                console.log("error"+error);
                res.redirect("/");
            }

            new_article.show_article_list(function (error,data){
                 res.render("index",{
                    title: "新浪文章首页",
                    article_list : data,
                    category_list : category_list
                });
            });
        })
    });

    /**
     * 文章详情
     */
    app.get("/article/:article_id",function (req,res){
        var article_id= req.params.article_id;
        Article.show_detail(article_id,function (error,article){
             res.render("article",{
                title: article[0].title,
                content : (article[0].content)
            });
        });
    });

    /**
     * 查询某个类别的文章
     */
    app.get("/class/:class_id",function (req,res){

    });


}