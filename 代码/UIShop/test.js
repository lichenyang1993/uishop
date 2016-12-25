/**
 * Created by Administrator on 2016/12/12 0012.
 */
var User = require("./user.js");

/**
 * 插入
 */
function insert() {

    var user = new User({
        username : 'Tracy McGrady',                 //用户账号
        userpwd: 'abcd',                            //密码
        userage: 37,                                //年龄
        logindate : new Date()                      //最近登录时间
    });

    user.save(function (err, res) {

        if (err) {
            console.log("Error:" + err);
        }
        else {
            console.log("Res:" + res);
        }

    });
}

function update(){
    var wherestr = {'username' : 'Tracy McGrady'};
    var updatestr = {'userpwd': 'zzzz'};

    User.update(wherestr, updatestr, function(err, res){
        if (err) {
            console.log("Error:" + err);
        }
        else {
            console.log("Res:" + res);
        }
    })
}

function findByIdAndUpdate(){
    var id = '584ec8680f51f02288c1d9ac';
    var updatestr = {'userpwd': 'abcd'};

    User.findByIdAndUpdate(id, updatestr, function(err, res){
        if (err) {
            console.log("Error:" + err);
        }
        else {
            console.log("Res:" + res);
        }
    })
}
function del(){
    var wherestr = {'username' : 'Tracy McGrady'};

    User.remove(wherestr, function(err, res){
        if (err) {
            console.log("Error:" + err);
        }
        else {
            console.log("Res:" + res);
        }
    })
}
console.log(new Date().getYear());

var Work = require('./db/db_module/work')
var Category = require('./db/db_module/category');


// Work.find({designerId: 2}).populate('designerid').exec(function(err,docs){
//     console.log(docs);
// })

Work.find({designerId: 2}, function(err, works){
    if(err){
        console.log(err);
    }else{
        for( var i = 0, size = works.length; i < size; i++){

            var work = {};
            work.workId = works[i].workId;
            work.workName = works[i].workName;
            work.workPrice = works[i].workPrice;
            work.category = '';
            work.designer = '';
            work.workDesc = works[i].workDesc;
            work.coverIcon = works[i].coverIcon;


            var categoryId = works[i].categoryId

            Category.findOne({id : categoryId}, function (err, category) {
                if(err){
                    console.log(err);
                }else{
                    work.category = category;
                    User.findOne({userId : 2}, function(err, user){
                        if(err){
                            console.log(err);
                        }else{
                            work.designer = user;
                            console.log(work);
                        }
                    });
                }
            });
        }
    }
});

function mycallback(){
    console.log("haha");
}
var count = 1;
for(var i = 0; i < 10; i++) {
    console.log("没有查到1");
    User.findOne({username: '12312'}, function (err, res) {
        if (err) {
            console.log(err);
        } else {
            if (res == null) {
                console.log("没有查到2");
                console.log(count++);
                mycallback();
            }
            //console.log(res);
        }
    })
}
//insert();
//update();
//findByIdAndUpdate();
//del();