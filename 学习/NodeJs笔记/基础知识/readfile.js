//readfile.js
var fs = require('fs');
fs.readFile('C:/Users/Administrator/Desktop/file.txt', 'utf-8', function(err,data){
	if(err){
		console.error(err);
	}else{
		console.log(data);
	}
});
console.log('end.');

//输出结果
//end
//file contents
//Node.js中，异步I/O是通过回调函数实现的。
//fs.readFile() 接收三个参数
//文件名，编码，函数
//称这个函数为回调函数

//readfilecallback.js
function readFileCallBack(err,data){
	if(err){
		console.error(err);
	}else{
		console.log(data);
	}
}
var fs = require('fs');
fs.readFile('C:/Users/Administrator/Desktop/file.txt','utf-8',readFileCallBack);
console.log('end.');

//上面两种方式是一样的，只不过第一种方式使用了匿名函数
//fs.readFile()调用时，将异步的I/O请求发送给操作系统，然后立即返回并执行后面的语句，执行完以后进入时间循环监听事件。
//当fs接收到I/O请求完成的事件时，事件循环会主动调用回调函数完成后续工作。
