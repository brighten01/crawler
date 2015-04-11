var request = require("request");


request({
    url:"http://cnodejs.org",
    method:'GET',
    headers:{
        'Accept-Language':'zh-CN,zh;q=0.8',
        'Cookie':'__utma=445.11211.45553.21.143'
    }
},function (error,response,body){
    if(!error && response.statusCode==200){
        console.log(body);
    }
});