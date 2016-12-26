//readfilesync.js
var fs = require('fs');
var data = fs.readFileSync('C:/Users/Administrator/Desktop/file.txt','utf-8');
console.log(data);
console.log('end.');

//输出结果
//file contents
//end.
