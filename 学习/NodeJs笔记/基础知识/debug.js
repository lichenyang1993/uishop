// 调试
// node debug debug.js
// node debug 127.0.0.1:5858(default port)
var a = 1;
var b = 'world'
var c = function(x){
	console.log('hello ' + x + a);
};
c(b);
