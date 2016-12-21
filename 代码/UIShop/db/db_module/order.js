/**
 * Created by Administrator on 2016/12/12 0012.
 */
/**
 * 订单信息
 */
var mongoose = require('../db.js'),
    Schema = mongoose.Schema;

var Order = new Schema({
    status:{type:String},
    buyer:{type:Schema.Types.ObjectId, ref:'User'},
    workId:{type:Schema.Types.ObjectId, ref:'Work'}
});

module.exports = mongoose.model('Order',Order);