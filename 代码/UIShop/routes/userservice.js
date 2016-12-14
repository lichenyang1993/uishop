/**
 * Created with JetBrains WebStorm.
 * User: Administrator
 * Date: 16-12-14
 * Time: 下午8:04
 * To change this template use File | Settings | File Templates.
 */
//用户登录功能
exports.login = function (req, res) {
    console.log('用户登录',
        req.body.username,
        req.body.password,
        req.body.userType
    );
    var username = req.body.username;
    var password = req.body.password;
    var userType = req.body.userType;

    var user = {username:username,password:password,userType:userType};

    if(username == '张三' && password=='123' && userType=='designer'){
        req.session.user = user;
        console.log(req.session);
        res.status(200);
        res.json({msg:'登录成功'});
        return;
    }

    if(username == '李四' && password=='123' && userType=='buyer'){
        req.session.user = user;
        res.status(200);
        res.json({msg:'登录成功'});
        return;
    }

    req.session.user = undefined;
    console.log(req.session);
    res.status(401);
    res.json({msg:'用户名或密码错误'});
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