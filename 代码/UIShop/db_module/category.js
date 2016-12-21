/**
 * Created by Administrator on 2016/12/20 0020.
 */
var mongoose = require('../../db.js'),
    Schema = mongoose.Schema;

var CategorySchema = new Schema({
    id:{type : Number},
    name:{type : String},
    text:{type : String}
});

module.exports = mongoose.model('Category',CategorySchema);