/**
 * Created by Administrator on 2016/12/12 0012.
 */
/**
 * 用户信息
 */
var mongoose = require('/db.js'),
    Schema = mongoose.Schema;

var UserSchema = new Schema({
    username:{type: String, unique: true},
    password:{type: String},
    userType:{type: String},
    userIcon:{type: String}


    // username : { type: String },                    //用户账号
    // userpwd: {type: String},                        //密码
    // userage: {type: Number},                        //年龄
    // logindate : { type: Date}                       //最近登录时间
});

module.exports = mongoose.model('User',User);