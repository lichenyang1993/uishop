//event.js
//Node.js所有的异步I/O操作在完成时都会发送给一个事件到事件队列。
//事件由EventEmitter对象提供。
//前面的fs.readFile和http.createServer的回调函数都是通过EventEmitter实现的。

//原理:
//event对象注册了事件 some_event 的一个监听
//通过setTimeout在1s以后event对象发送事件some_event,此时回调用some_event的监听器

var EventEmitter = require('events').EventEmitter;
var event = new EventEmitter();

// event注册事件 some_event
event.on('some_event', function(){
	console.log('some_event occured');
});

setTimeout(function(){
	//event对象发送事件 some_event
	event.emit('some_event');
},1000);

//事件发射器
/*
events模块只提供一个对象：events.EventEmitter.
EventEmitter的核心就是事件发射与事件监听器功能的封装。
EventEmitter的每个事件由一个事件名和若干参数组成，事件名就是一个字符串
对于每个事件EventEmitter支持若干个事件监听器.
当事件发射时，注册到这个事件的事件监听器被依次调用，事件参数作为回调函数参数传递。
*/
var events = require('events');
var emmiter = new events.EventEmitter();
emmiter.on('someEvent', function(arg1, arg2){
	console.log('listener1', arg1, arg2);
});
emmiter.on('someEvent',function(arg1, arg2){
	console.log('listener2', arg1, arg2);
});
emmiter.emit('someEvent', 'byvoid','1991');

/*
EventEmitter常用API

EventEmitter.on(event, listener)
为指定事件注册一个监听器，接受一个字符串event和一个回调函数listener

EventEmitter.emit(event, arg1, arg2, [...])
发射event事件，传递若干可选参数到事件监听器的参数表。

EventEmitter.once(event, listener)
为制定注册一个单次的监听器，即监听器最多只会触发一次，触发后立刻解除

EventEmitter.removeListener(event, listener)
移除指定事件的某个监听器,listener必须是该事件已经注册过的监听器

EventEmitter.removeAllListener([evnet])
移除所有事件的所有监听器，如果指定event则移除指定event的监听器



*/
