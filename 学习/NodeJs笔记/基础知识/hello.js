//覆盖exports

//hello.js
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

module.exports = Hello;

//模块接口的唯一变化是使用了
//module.exports = Hello
//代替
//exports.Hello = Hello
//在外部引用该模块时，其接口对象就是要输出的Hello对象本身，而不是原先的exports
//exports 本事仅仅是一个普通的空对象，即{}，专门用来声明接口

//!不可以对 exports 直接赋值
//要使用module.exports 赋值
//exports 只是一个 和 module.exports指向同一个对象的变量,
//它本身会在模块执行结束后释放，但是module不会，因此只能
//通过指定module.exports来改变访问接口
