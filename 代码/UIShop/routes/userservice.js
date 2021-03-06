/**
 * Created with JetBrains WebStorm.
 * User: Administrator
 * Date: 16-12-14
 * Time: 下午8:04
 * To change this template use File | Settings | File Templates.
 */
//用户登录功能
var User = require('../db/db_module/user')
exports.login = function (req, res) {
    console.log('用户登录',
        req.body.username,
        req.body.password,
        req.body.userType
    );
    var username = req.body.username;
    var password = req.body.password;
    var userType = req.body.userType;

    User.findOne({username : username}, function(err, result){
        if(err){
            console.log("Error: " + err);
        } else{
            console.log("Res: " + result);
            var user = result;
            if(user != null && user.password == password && user.userType == userType){
                req.session.user = user;
                console.log(req.session);
                res.status(200);
                res.json({msg:'登录成功'});
                return;
            }else{
                req.session.user = undefined;
                console.log(req.session);
                res.status(401);
                res.json({msg:'用户名或密码错误'});
            }
        }
    });
}

//获取当前登录信息
exports.getLoginUser = function (req, res) {
//    var user = {username:'张三',userType:'designer',userId:'100023422'};
    console.log(req.session);
    var user = req.session.user;
    res.status(200);
    if(user == undefined){
        res.status(403);
    }
    res.json(user);
}

//退出登录
exports.logout = function(req, res){
    req.session.user = undefined;
    res.json({});
}