/**
 * Created by Administrator on 2016/12/12 0012.
 */
var User = require("./user.js");

/**
 * 插入
 */
function insert() {

    var user = new User({
        username : 'Tracy McGrady',                 //用户账号
        userpwd: 'abcd',                            //密码
        userage: 37,                                //年龄
        logindate : new Date()                      //最近登录时间
    });

    user.save(function (err, res) {

        if (err) {
            console.log("Error:" + err);
        }
        else {
            console.log("Res:" + res);
        }

    });
}

function update(){
    var wherestr = {'username' : 'Tracy McGrady'};
    var updatestr = {'userpwd': 'zzzz'};

    User.update(wherestr, updatestr, function(err, res){
        if (err) {
            console.log("Error:" + err);
        }
        else {
            console.log("Res:" + res);
        }
    })
}

function findByIdAndUpdate(){
    var id = '584ec8680f51f02288c1d9ac';
    var updatestr = {'userpwd': 'abcd'};

    User.findByIdAndUpdate(id, updatestr, function(err, res){
        if (err) {
            console.log("Error:" + err);
        }
        else {
            console.log("Res:" + res);
        }
    })
}
function del(){
    var wherestr = {'username' : 'Tracy McGrady'};

    User.remove(wherestr, function(err, res){
        if (err) {
            console.log("Error:" + err);
        }
        else {
            console.log("Res:" + res);
        }
    })
}

insert();
//update();
//findByIdAndUpdate();
//del();