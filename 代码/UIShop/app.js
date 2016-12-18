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

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(favicon());
app.use(logger('dev'));
app.use(express.bodyParser({uploadDir:'./upload'}));
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
app.post('/fileUploadTest', fileUploadTest.postFile);
app.get('/demo', demo.getdemo);

// 用户登录
app.post('/api/session', userservice.login);

// 获取当前登录用户
app.get('/api/session', userservice.getLoginUser);

// 退出登录
app.delete('/api/session', userservice.logout);

// 检索作品
app.get('/api/work', workservice.searchWork);

// 获取作品详情
app.get('/api/work/:workId', workservice.getWorkById);

// 提交订单
app.post('/api/order', orderservice.createOrder)

// 支付订单
app.put('/api/order', orderservice.payOrder)
/// error handlers

// 获取买家订单
app.get('/api/buyer/order', orderservice.getBuyerOrder)

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

module.exports = app;
