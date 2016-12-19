/**
 * Created by Administrator on 2016/12/12 0012.
 */
/**
 * 设计作品
 */
var mongoose = require('../db.js'),
    Schema = mongoose.Schema;

var WorkSchema = new Schema({
    workId:{type:Number},
    workName:{type:String},
    workPrice:{type:Number},
    category:{type:String},
    designerId:{type:Number},   // 设计师ID
    workDesc:{type:String},
    workImage:{type:[String]},  // 多张展示图片
    workCover:{tyep:[String]},  // 作品封面
    download:{type:String}      // 作品下载地址，交易成功之后自动生成

    // username : { type: String },                    //用户账号
    // userpwd: {type: String},                        //密码
    // userage: {type: Number},                        //年龄
    // logindate : { type: Date}                       //最近登录时间
});

module.exports = mongoose.model('Work',WorkSchema);