//HTTP服务器与客户端
/*
Node.js标准库提供了http模块
http.Server是一个基于事件的HTTP服务器
http.request是一个HTTP客户端工具，用于向HTTP服务器发起请求
*/

//HTTP服务器
/*
http.Server是http模块中的HTTP服务器对象
用Node.js做的所有基于HTTP协议的系统，都是基于http.Server实现的
*/

var http = require('http');
//http.createServer()创建了一个http.Server的实例
//将一个函数作为HTTP请求处理函数
//这个函数接收两个参数
//请求对象req 响应对象res
http.createServer(function(req, res){
  req.on('data',function(chunk){
    console.log(chunk);
  });
  //res显示地写回了响应代码200
  //指定响应头为'Content-Type':'text/html'
  res.writeHead(200, {'Content-Type': 'text/html'});
  //然后写入响应体
  res.write('<h1>Node.js</h1>');
  //res.end结束并发送
  res.end('<p>Hello World</p>');
  //最后该实例调用listen函数，启动服务器监听3000端口
}).listen(3000);

console.log('HTTP Server is listening at port 3000');

/*
http.Server的事件
http.Server是一个基于事件的HTTP服务器，所有的请求都被封装成独立的事件
只需要对它的事件编写响应函数就可以实现HTTP服务器的所有功能
它继承EventEmitter，提供一下几个事件

request：当客户端请求到来时，该事件被触发，提供两个参数 req 和res，分别是
http.ServerRequest 和 http.ServerResponse 的实例，表示请求和响应信息。

connection：当 TCP 连接建立时，该事件被触发，提供一个参数 socket，为
net.Socket 的实例。connection 事件的粒度要大于 request，因为客户端在
Keep-Alive 模式下可能会在同一个连接内发送多次请求。

close ：当服务器关闭时，该事件被触发。注意不是在用户连接断开时。
*/

//http.ServerRequest
/*
是HTTP请求的信息，是后端开发者最关注的内容
一般由http.Server的request事件发送，作为第一个参数传递，简称req
ServerRequest属性提供一些属性：
  complete             客户端请求是否已经发送完成
  httpVersion HTTP     协议版本，通常是 1.0 或 1.1
  method HTTP          请求方法，如 GET、POST、PUT、DELETE 等
  url                  原始的请求路径，例如 /static/image/x.jpg 或 /user?name=byvoid
  headers HTTP         请求头
  trailers HTTP        请求尾（不常见）
  connection           当前 HTTP连接套接字，为 net.Socket 的实例
  socket connection    属性的别名
  client client        属性的别名
HTTP请求分为两部分：请求头(Request Header) 和 请求体(Request Body)
Request Body可能相对较长，需要一定的传输事件
因此http.ServerRequest提供了以下3个事件用于控制请求体传输
data: 当请求体数据到来时，该事件被触发
      该事件提供一个参数chunk，表示接收到的数据。
      如果该事件没有被监听，那么请求体将会被抛弃。
      该事件可能会被调用多次。
end:  当请求体数据传输完成时，该事件被触发，此后将不会再有数据到来。
close:用户当前请求结束时，该事件被触发。不同于end，如果用户强制终止了传输，也还是会调用close
*/

//http.ServerResponse
/*
http.ServerResponse是返回给客户端的消息，决定了用户最终能够看到的结果。
它也是有http.Server的request事件发送的，作为第二个参数传递

http.ServerResponse有三个重要的成员函数，用于返回响应头，响应内容以及结束请求

response.writeHead(statusCode,[headers]) 向请求的客户端发送响应头
statusCode是HTTP状态码
headers表示响应头的每个属性
该函数在一个请求内最多只能调用一次，如果不调用自动生成一个响应头

response.write(data, [encoding]):向请求的客户端发送响应内容
data是一个Buffer或字符串，表示要发送的内容
如果data是字符串，那么需要指定encoding来说明它的编码方式，默认是utf-8
在resposne.end调用之前，这个函数可以调用多次

response.end([data],[encoding]):结束响应
告知客户端所有发送已经完成
当所有要返回的内容发送完毕时，必须调用一次该函数
接收两个参数，意义和response.write()相同
如果不调用该函数，客户端永远处于等待状态
*/
