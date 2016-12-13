/**
 * Created by Administrator on 2016/12/13 0013.
 */
var User = require('../Modul/user');
exports.postMethod = function (req, res) {
    console.log('received post request');
    console.log('username: ' + req.body.username);
    console.log('password: ' + req.body.password);
    var usermodel=new User.Usermodel(req.body.username,req.body.password);
    res.json(usermodel);
}