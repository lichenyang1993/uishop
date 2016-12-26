// 文件系统fs
/*

fs模块是文件操作的封装
与其他模块不同
fs模块中所有的操作都提供了异步和同步两个版本
如：
异步读取文件fs.readFile()
同步读取文件fs.readFileSync()
*/

// fs.readFile()
/*
fs.readFile(filename,[encoding],[callback(err,data)])
filename：要读取的文件名
encoding：文件的字符编码
callback：回调函数，用于接收文件内容
          err表示有没有错误发生
          data表示文件的内容
*/

var fs = require('fs');

fs.readFile('file.txt', 'utf-8', function(err,data){
  if(err){
    console.log(err);
  } else {
    console.log(data);
  }
});

/*
Node.js的异步编程接口习惯是以函数的最后一个参数作为回调函数，
通常一个函数只有一个回调函数
回调函数参数中第一个是err,其余的参数是其他返回内容
如果没有错误发生err的值是null或undefined
如果有错误发生err通常是Error对象的实例
*/


//fs.open()
/*
fs.open(path, flags, [mode], [callback(err, fd)])
是POSIX open函数的封装，与c语言标准库的fopen函数类似
path：文件路径
flags:
      r： 以读取模式打开文件
      r+: 以读写模式打开文件
      w:  以写入模式打开文件，如果文件不存在则创建
      w+: 以读写模式打开文件，如果文件不存在则创建
      a:  以追加模式打开文件，如果文件不存在则创建
      a+: 以读取追加模式打开文件，如果文件不存在则创建
mode:用于创建文件时给文件指定权限 default value:0666
回调函数将传递一个文件描述符fd
*/
