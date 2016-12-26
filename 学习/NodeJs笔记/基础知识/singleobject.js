//覆盖exports

//singleobject.js
//把一个对象封装到模块中
function Hello(){
	var name;
	this.setName = function(thyName){
		name = thyName;
	};
	this.sayHello = function(){
		console.log('Hello ' + name);
	};
};

exports.Hello = Hello;
