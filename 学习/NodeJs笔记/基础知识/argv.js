//全局对象Global Object
/*
JavaScript中有一个特殊对象，成为全局对象，它及其所有属性都可以在程序的任何地方访问。
在浏览器JavaScript中，通常window是全局对象
Nodejs中全局对象是global，所有的全局变量(除global本身之外)都是global对象的属性
在nodejs中能够直接访问到对象通常都是global的属性，如console、process
*/

//process
/*
process是一个全局变量，即global对象的属性。

process.argv是命令行参数组，
第一个元素是node，
第二个元素是脚本文件名，
第三个元素开始每个元素是一个运行参数。
*/

//argv.js
//node argv.js 1991 name=byvoid --v "Carbo Kuo"
console.log(process.argv);

//输出结果
/*
[ 'node',
'/home/byvoid/argv.js',
'1991',
'name=byvoid',
'--v',
'Carbo Kuo' ]
*/

//process.stdout是标准输出流，通常我们使用的console.log()向标准输出打印字符，
//process.stdout.write()函数提供更底层的接口。

//process.stdin是标准输入流，初始时它是被暂停的，要想从标准输入流读取数据，
//必须恢复流，兵手动编写流的时间响应函数

process.stdin.resume();
process.stdin.on('data', function(data){
	process.stdout.write('read from console: ' + data.toString());
});

//process.nextTick(callback)
//功能是为时间循环设置一项任务，Node.js会在下一次事件循环调响应时调用callback
//因为nodejs只有一个线程，因此在任何时刻都只有一个事件在进行
//如果这件事占用大量的CPU时间，执行时间循环中的下一个时间就需要等待很久
//因此node.js的一个编程原则就是尽量缩短每个事件的执行时间
//process.nextTick()提供了这样的一个工具，把复杂的工作拆散，变成一个较小的事件

// 假设somethingComplicated() 和 compute() 是两个耗时的函数
// 下面的程序在调用doSomething()时会先执行somethingComplicated()
// 然后立即调用回调函数，在onEnd()中又会执行compute()。
function doSomething(arfs, callback){
	somethingComplicated(args);
	callback();
}

doSomething(function onEnd(){
	compute();
});

//使用process.nextTick()改写
//改写后，程序会把上面耗时的操作拆分为两件事，减少每件事执行的时间，提高事件响应速度
function doSomething(arfs, callback){
	somethingComplicated(args);
	process.nextTick(callback);
}

doSomething(function onEnd(){
	compute();
});
