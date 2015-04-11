var cheerio = require("cheerio");
var $ = cheerio.load('<h2  class="title">Hello world</h2>');
$("h2 .title").text('Hello world');
console.log($.html());
