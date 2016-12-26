var http = require('http');
http.createServer(function(req, res){
	res.writeHead(200,{'content-Type':'text/html'});
	res.write('<h1>Node.js</h1>');
	res.write('<div>床前明月光,疑是地上霜。举头望明月,低头思故乡。</div>');
	res.end('<p>hello world</p>');
	}).listen(3000);
console.log("HTTP Server is listening at port 3000.");
