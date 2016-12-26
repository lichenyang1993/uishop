//创建及加载模块
//Node.js中 一个文件就是一个模块
//Node.js提供了exports和require两个对象
//exports:模块公开的接口
//require:从外部获取一个模块的接口

//module.js
var name;

exports.setName = function(thyName){
	name = thyName;
};
exports.sayHello = function(){
	console.log('Hello ' + name);
}
