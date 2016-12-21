/**
 * Created by Administrator on 2016/12/12 0012.
 */
/**
 * 设计作品
 */
var mongoose = require('../db.js'),
    Schema = mongoose.Schema;

var Work= new Schema({
    workName:{type:String},//作品名
    workPrice:{type:Number},//作品价格
    workDesc:{type:String},//作品简介
    category:{type:Schema.Types.ObjectId, ref:'Category'},//作品分类
    designer:{type:Schema.Types.ObjectId, ref:'User'},//作品设计人
    workImage:{type:[String]},//作品图例
    coverIcon:{type:String},//作品封面
    fileZip:{type:String}//作品下载路径
});

module.exports = mongoose.model('Work',Work);