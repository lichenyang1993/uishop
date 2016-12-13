/**
 * Created by Administrator on 2016/12/13 0013.
 */
exports.getMethod = function (req, res) {
    console.log('received get request');
    console.log('username: ' + req.query.username);
}