// 获取GET请求内容
// 手动解析url?后面的部分，作为GET请求的参数。
// node.js的url模块中的parse函数提供了这个功能

//httpserverrequestget.js
var http = require('http');
var url = require('url');
var util = require('util');

http.createServer(function(req, res){
  res.writeHead(200, {'Content-Type':'text/plain'});
  res.end(util.inspect(url.parse(req.url,true)));
}).listen(3000);
console.log('Server start 3000...[success]');

/*
http://127.0.0.1:3000/user?name=byvoid&email=byvoid@byvoid.com
Url {
  protocol: null,
  slashes: null,
  auth: null,
  host: null,
  port: null,
  hostname: null,
  hash: null,
  search: '?name=byvoid&email=byvoid@byvoid.com',
  query: { name: 'byvoid', email: 'byvoid@byvoid.com' },
  pathname: '/user',
  path: '/user?name=byvoid&email=byvoid@byvoid.com',
  href: '/user?name=byvoid&email=byvoid@byvoid.com' }
*/

//通过url.parse，原始的path被解析为一个对象
//其中query就是我们所谓的GET请求的内容，而路径则是pathname
