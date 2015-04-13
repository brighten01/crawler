var express = require("express");
var routes = require("./routes");
var http=  require("http");
var path = require('path');
var app = express();
app.set('port', process.env.PORT || 3000);
app.use(express.urlencoded());
app.engine('.html', require('ejs').__express);
app.set('view engine', 'html');
app.set("views",path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(app.router);
http.createServer(app).listen(app.get('port'),function (){
    console.log("crawler is listening on port "+ app.get('port'));
});

routes(app);