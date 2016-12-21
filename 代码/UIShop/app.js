var express = require('express');
var session = require('express-session');
var http = require('http');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes');
var users = require('./routes/user');
var getMethodTest = require('./routes/getMethodTest');
var postMethodTest = require('./routes/postMethodTest');
var fileUploadTest = require('./routes/fileuploadTest');
var demo = require('./routes/demo');

/*
------------------- 正式项目使用的模块 --------------------------------
 */
var userservice = require('./routes/userservice');
var workservice = require('./routes/workservice');
var orderservice = require('./routes/orderservice');

var app = express();
var fs = require('fs');
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(favicon());
app.use(logger('dev'));
// var path = './public/upload';
app.use(express.bodyParser({uploadDir:'./public/upload'}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(session({
    secret: '12345',
    name: 'ui-shop',   //这里的name值得是cookie的name，默认cookie的name是：connect.sid
    cookie: {maxAge: 1200000 },  //设置maxAge是120000ms，即20min后session和相应的cookie失效过期
    resave: false,
    saveUninitialized: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(app.router);

app.get('/', routes.index);
app.get('/users', users.list);
app.get('/getMethodTest', getMethodTest.getMethod);
app.post('/postMethodTest', postMethodTest.postMethod);
//app.post('/fileUploadTest', fileUploadTest.postFile);
app.get('/demo', demo.getdemo);

// 用户登录
app.post('/api/session', userservice.login);

// 获取当前登录用户
app.get('/api/session', userservice.getLoginUser);

// 退出登录
app.delete('/api/session', userservice.logout);


// 检索作品
app.get('/api/work', workservice.searchWork);
// 检查是否登录
app.all('/api/work', function(req, res, next){
    var user = req.session.user;
    if(user == undefined){
        var workFile = req.files.workFile;
        var workPics = req.files.workPic;
        var workCover = req.files.workCover;

        fs.unlink(workFile.path, function(err){});
        fs.unlink(workCover.path, function(err){});
        for(var i = 0; i < workPics.length; i++){
            fs.unlink(workPics[i].path, function(err){});
        }

        res.status(403);
        console.log('经过过滤器');
        res.end('没有登录');
        return;
    }else {
        next();
    }
});


// 提交作品
app.post('/api/work', workservice.submitWork);



// 获取设计师作品列表
app.get('/api/designer/work',workservice.getDesignerWorks);

// 获取作品详情
app.get('/api/work/:workId', workservice.getWorkById);

// 提交订单
app.post('/api/order', orderservice.payOrders);

// 确认收货
app.put('/api/order/:orderId', orderservice.confirmPayOrder);
/// error handlers



// 获取买家订单
app.get('/api/buyer/order', orderservice.getBuyerOrder)
// 获取设计师订单
app.get('/api/designer/order', orderservice.getDesignerOrder)

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.render('error', {
        message: err.message,
        error: {}
    });
});

/// catch 404 and forwarding to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// exports.getPath = function(){
//     return path;
// }

module.exports = app;
