/**
 * Created by Administrator on 2016/12/13 0013.
 */
var fs = require('fs');
exports.postFile = function (req, res) {
    var upfile = req.files.upfile;
    var files = [];
    if (upfile instanceof  Array) {
        files = upfile;
    } else {
        files.push(upfile);
    }
    for (var i = 0; i < files.length; i++) {
        var file = files[i];
        var path = file.path;
        var name = file.name;
        var target_path = "./upload/" + req.body.filename;
        fs.rename(path, target_path, function (err) {
            if (err) throw err;
        });
    }

    res.render('index', { title:'Complete' });
}