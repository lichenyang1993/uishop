/**
 * Created by Administrator on 2016/12/12 0012.
 */
/**
 * 设计作品
 */
var mongoose = require('/db.js'),
    Schema = mongoose.Schema;

var WorkSchema = new Schema({
    workName:{type:String},
    workPrice:{type:Number},
    workDesc:{type:String},
    category:{type:Schema.Types.ObjectId, ref:'Category'},
    designer:{type:Schema.Types.ObjectId, ref:'User'},
    workImage:{type:[String]},  // 多张展示图片
    coverIcon:{type:String},  // 作品封面
    fileZip:{type:String}      // 作品下载地址，交易成功之后自动生成


    // categoryid: {type: mongoose.Schema.Types.ObjectId, ref: 'Category'},
    // designerid:{type: mongoose.Schema.Types.ObjectId, ref: 'User'},   // 设计师ID


    // username : { type: String },                    //用户账号
    // userpwd: {type: String},                        //密码
    // userage: {type: Number},                        //年龄
    // logindate : { type: Date}                       //最近登录时间
});

module.exports = mongoose.model('Work',WorkSchema);