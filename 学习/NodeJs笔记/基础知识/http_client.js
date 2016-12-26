//HTTP客户端

/*
http模块提供了两个函数http.request和http.get，功能是作为客户端向HTTP服务器发送请求

http.request(options, callback)发起HTTP请求

options表示请求参数 常用参数如下：
    host      请求网站的域名或IP地址
    port      请求网站的端口号，默认80
    method    请求方法，默认GET
    path      请求的相对于根的路径，默认是"/"
              例如/search?query=byvoid
    headers   请求头内容
callback是请求的回调函数
    传递一个参数，为http.ClientRequest实例

http.request返回一个http.ClientRequest的实例

*/
//httprequest.js

var http = require('http');
var querystring = require('querystring');
var contents = querystring.stringify({
  name: 'byvoid',
  email: 'byvoid@byvoid.com',
  address: 'Zijing 2#, Tsinghua University',
});
var options = {
  host: 'www.byvoid.com',
  path: '/application/node/post.php',
  method: 'POST',
  headers: {
  'Content-Type': 'application/x-www-form-urlencoded',
  'Content-Length' : contents.length
  }
};
var req = http.request(options, function(res) {
  res.setEncoding('utf8');
  res.on('data', function (data) {
    console.log(data);
    });
  });
req.write(contents);
req.end();// 结束请求，否则服务器将不会收到消息！

//httpget.js
var http = require('http');
var req = http.get({host:'www.byvoid.com'});
req.on('response', function(res){
  res.setEncoding('utf-8');
  res.on('data',function(data){
    console.log(data);
  });
});
