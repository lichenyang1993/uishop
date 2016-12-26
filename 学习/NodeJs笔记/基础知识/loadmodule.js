//单次加载
//上面的例子类似创建一个对象，但实际上和对象有本质的区别
//require不会重复加载模块，也就是说无论调用多少次require，获得的模块都是同一个。

//loadmodule.js

var hello1 = require('./module');
hello1.setName('BYVoid');

var hello2 = require('./module');
hello2.setName('BYVoid 2');

hello1.sayHello();

//输出的结果是BYVoid 2
//因为hello1和hello2指向的是同一个实例
