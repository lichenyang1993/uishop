/**
 * Created by Administrator on 2016/12/13 0013.
 */
var fs = require('fs');
exports.getdemo = function(req, res){
    res.header("Access-Control-Allow-Origin", "*");   //设置跨域访问
    fs.readFile('./demo.json', 'utf-8', function(err,data){
        if(err){
            console.log(err);
        } else {
            console.log(data);
            console.log(typeof data);
            res.status(200);
            res.json(JSON.parse(data));

        }
    });
}