/**
 * Created by Administrator on 2016/12/12 0012.
 */
/**
 * 订单信息
 */
var mongoose = require('../db.js'),
    Schema = mongoose.Schema;

var OrderSchema = new Schema({
    orderId:{type:Number},
    status:{type:String},
    buyerId:{type:Number},
    workId:{type:Number}

    // username : { type: String },                    //用户账号
    // userpwd: {type: String},                        //密码
    // userage: {type: Number},                        //年龄
    // logindate : { type: Date}                       //最近登录时间
});

module.exports = mongoose.model('Order',OrderSchema);