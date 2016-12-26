//util

//util.inherits
/*
util.inherits(constructor, superConstructor)是一个实现对象间原型继承的函数。
JavaScript没有提供对象继承的语言级别特性，而是通过原型复制实现的
*/

//inherits.js
var util = require('util');

function Base(){
	this.name = 'base';
	this.base = 1991;

	this.sayHello = function(){
		console.log('Hello ' + this.name);
	};
}

Base.prototype.showName = function(){
	console.log(this.name);
};
/*
Base.prototype.sayHello = function(){
	console.log('Hello ' + this.name);
};
*/

function Sub(){
	this.name = 'sub';
}

util.inherits(Sub, Base);

var objectBase = new Base();
objectBase.showName();
objectBase.sayHello();
console.log(objectBase);

var objSub = new Sub();
objSub.showName();
//objSub.sayHello();
console.log(objSub);

//输出结果
//base
//Hello base
//{name:'base',base:1991,sayHello:[function]}
//sub
//{name:'sub'}
//Sub 只继承了Base在原型中定义的函数，而构造函数内部创造的base属性
//和sayHello函数都没有被Sub继承
//同时，在原型中定义的属性不会被console.log作为对象的属性输出


//util.inspect
//util.inspect(object,[showHidden],[depth],[colors])是一个将任意对象
//转换成字符串的方法，通常用于调试和错误输出。
//showHidden 是一个可选参数 为true 会输出更多的隐藏信息
//depth 最大递归的层数。default value：2，指定为null表示不限制，完整变量对象
//color 值为true，输出格式讲以ANSI颜色编码
function Person() {
this.name = 'byvoid';
this.toString = function() {
return this.name;
};
}
var obj = new Person();
console.log(util.inspect(obj));
console.log(util.inspect(obj, true,2,true));
