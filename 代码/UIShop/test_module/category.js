/**
 * Created by Administrator on 2016/12/20 0020.
 */
var mongoose = require('/db'),
    Schema = mongoose.Schema;

var CategorySchema = new Schema({
    name:{type : String},
    text:{type : String}
});

module.exports = mongoose.model('Category',Category);