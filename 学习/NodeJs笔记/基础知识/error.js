//error事件
/*
EventEmitter定义了一个特殊事件error
它包含了“错误”的语义
我们在遇到异常的时候通常会发射error事件
当error被发射时，EventEmitter规定
如果没有相应的监听器
Nodejs会把它当做异常，退出程序并打印调用堆栈。
一般要为会发射error事件的对象设置监听器，避免程序崩溃
*/

var events = require('events')
var emmiter = new events.EventEmitter();

/*
!!如果不注册监听直接运行，程序会直接退出。
emmiter.on('error',function(){
  console.log('发生了错误');
});
*/

emmiter.emit('error');
