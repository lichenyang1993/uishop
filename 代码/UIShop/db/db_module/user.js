/**
 * Created by Administrator on 2016/12/12 0012.
 */
/**
 * 用户信息
 */
var mongoose = require('../db.js'),
    Schema = mongoose.Schema;

var User = new Schema({
    username:{type: String, unique:true},
    password:{type:String},
    userType:{type:String},
    userIcon:{type:String}
});

module.exports = mongoose.model('User',User);