//Node.js默认是不会解析请求体的
//原因是等待请求体传输可能是一件耗时的操作，比如文件上传
//当需要的时候，需要手动来做

//http_post.js

//下面这段代码只是示例
//不能用于实际
//因为它有严重的效率问题和安全问题
var http = require('http');
var querystring = require('querystring');
var util = require('util');

http.createServer(function(req, res){
  var post = '';
  // 给http.ServerRequest注册data事件
  req.on('data', function(chunk){
    post += chunk;
  });
  req.on('end', function(chunk){
    // 通过querystring.parse将post解析为真正的post请求
    post = querystring.parse(post);
    // 返回给客户端
    res.end(util.inspect(post));
  })
}).listen(3000);
