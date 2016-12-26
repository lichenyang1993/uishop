//getmodule.js
var myModule = require('./module');
myModule.setName('BYVoid');
myModule.sayHello();

//modual.js 通过exports对象把setName 和 sayHello作为模块的访问接口
//getmodule.js 通过require(./module)加载这个模块，然后就可以直接访问module.js中的exports对象的成员函数
