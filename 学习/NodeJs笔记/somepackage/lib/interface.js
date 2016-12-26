/*
创建包
Node.js的包是一个目录

package.json必须在包的顶层目录下，
二进制文件在bin目录下，
JavaScript文件在lib目录下,
文档在doc目录下，
单元测试在test目录下。
*/

//somepackage/index.js
exports.hello = function() {
	console.log('Hello.');
};

/*
nodejs在调用某个包的时候，会首先检查package.json文件中的main字段
将其作为包的模块接口，如果package.json或main字段不存在
会尝试寻找index.js或index.node作为包的接口
*/

/*
package.json 应该包含一下字段

 name：包的名称，必须是唯一的，由小写英文字母、数字和下划线组成，不能包含
空格。
 description：包的简要说明。
 version：符合语义化版本识别①规范的版本字符串。
 keywords：关键字数组，通常用于搜索。
 maintainers：维护者数组，每个元素要包含 name、email （可选）、web （可选）
字段。
 contributors：贡献者数组，格式与maintainers相同。包的作者应该是贡献者
数组的第一个元素。
 bugs：提交bug的地址，可以是网址或者电子邮件地址。
 licenses：许可证数组，每个元素要包含 type （许可证的名称）和 url （链接到
许可证文本的地址）字段。
 repositories：仓库托管地址数组，每个元素要包含 type （仓库的类型，如 git ）、
url （仓库的地址）和 path （相对于仓库的路径，可选）字段。
 dependencies：包的依赖，一个关联数组，由包名称和版本号组成。

例子：

{
"name": "mypackage",
"description": "Sample package for CommonJS. This package demonstrates the required
elements of a CommonJS package.",
"version": "0.7.0",
"keywords": [
"package",
"example"
],
"maintainers": [
{
"name": "Bill Smith",
"email": "bills@example.com",
}
],
"contributors": [
{
"name": "BYVoid",
"web": "http://www.byvoid.com/"
}
],
"bugs": {
"mail": "dev@example.com",
"web": "http://www.example.com/bugs"
},
"licenses": [
{
"type": "GPLv2",
"url": "http://www.example.org/licenses/gpl.html"
}
],
"repositories": [
{
"type": "git",
"url": "http://github.com/BYVoid/mypackage.git"
}
],
"dependencies": {
"webkit": "1.2",
"ssl": {
"gnutls": ["1.0", "2.0"],
"openssl": "0.9.8"
}
}
}
*/