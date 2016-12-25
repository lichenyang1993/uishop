/**
 * Created by Administrator on 2016/12/21.
 */
var User = require('./user')
user1 = new User({
    username:'张三',
    password:'123',
    userType:'designer',
    userIcon:'images/avatars/3.png'
});
user2 = new User({
    username:'李四',
    password:'123',
    userType:'buyer'
})

var Category = require('./category');
var c1 = new Category({
    name:"portal",
    text:"门户网站"
});
var c2 = new Category({
    name:"industry",
    text:"行业网站"
});
var c3 = new Category({
    name:"government",
    text:"政府网站"
});
var c4 = new Category({
    name:"social",
    text:"社交/论坛"
});
var c5 = new Category({
    name:"tool",
    text:"工具类网站"
});
var c6 = new Category({
    name:"game",
    text:"游戏"
});
var c7 = new Category({
    name:"business",
    text:"企业网站"
});
var c8 = new Category({
    name:"music",
    text:"视频/音乐"
});
var c9 = new Category({
    name:"classification",
    text:"同城/租房/分类信息"
});

function insertUser() {
    user1.save(function (err) {
        console.log(err);
    });
    user2.save(function (err) {
        console.log(err);
    });
}

function insertCategory(){
    c1.save(function (err) {
        console.log(err);
    });
    c2.save(function (err) {
        console.log(err);
    });
    c3.save(function (err) {
        console.log(err);
    });
    c4.save(function (err) {
        console.log(err);
    });
    c5.save(function (err) {
        console.log(err);
    });
    c6.save(function (err) {
        console.log(err);
    });
    c7.save(function (err) {
        console.log(err);
    });
    c8.save(function (err) {
        console.log(err);
    });
    c9.save(function (err) {
        console.log(err);
    });
}

// insertUser();
// insertCategory();

// var Work = require("./work")
//
// var keyword = '测试'
// Work.find({workName: eval("/"+keyword+"/i")},function(err,res){
//     console.log(res);
// });

//User.findByIdAndUpdate()
var Work = require('../db_module/work');
Work.findByIdAndUpdate({_id:"585b69c3c3ca4a5c17bcad08"},{"workName":"我的小设计"})
    .populate('designer','_id username userType userIcon',null)
    .populate('category','_id name text',null)
    .exec(function(err, work){
        if(err){
            console.log(err);
        }else {
            console.log(work);
        }
    });