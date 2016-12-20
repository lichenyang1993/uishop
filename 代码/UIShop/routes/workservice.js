/**
 * Created with JetBrains WebStorm.
 * User: Administrator
 * Date: 16-12-15
 * Time: 下午11:08
 * To change this template use File | Settings | File Templates.
 */
var fs = require('fs');
var Work = require('../db_module/work');
var Category = require('../db_module/category');
var User =require('../db_module/user');
exports.searchWork = function (req, res) {
    var searchResult = {
        works : [
            {
                workId:1324,
                workName:"蓝色的官网",
                workPrice:1600.00,
                category:{
                    id:1,
                    name:"social",
                    text:"社交/论坛"
                },
                designer:{
                    id:10001,
                    name:"rrrmandy",
                    icon:"images/avatars/10.png"
//                    ,balance:10000.00
                },
                workDesc:"为蓝色的产品设计的官网，希望大家喜欢\n\n换行测试",
                coverIcon:"images/product-details/1.jpg",
                images:[
                    "images/works/1.jpg",
                    "images/works/2.jpg",
                    "images/works/3.jpg"
                ]
//                ],
//                fileList:[
//                    "upload/works/1.jpg",
//                    "upload/works/2.jpg",
//                    "upload/works/3.jpg"
//                ],
//                fileZip:"upload/works/zips/dce74e53-e35f-4b69-846b-409950c93800.zip"
            }
        ],
        resultCount:2
    };
    console.log(req.query.pageNum);
    console.log(req.query.keyword);
    res.status(200);
    res.json(searchResult);
}

// 根据Id获取作品详情
exports.getWorkById = function (req, res) {
    var work =
        {
            workId:1324,
            workName:"蓝色的官网",
            workPrice:1600.00,
            category:{
                id:1,
                name:"social",
                text:"社交/论坛"
            },
            designer:{
                id:10001,
                name:"rrrmandy",
                icon:"images/avatars/10.png"
//                ,
//                balance:10000.00
            },
            workDesc:"为蓝色的产品设计的官网，希望大家喜欢\n\n换行测试",
            coverIcon:"images/product-details/1.jpg",
            images:[
                "images/works/1.jpg",
                "images/works/2.jpg",
                "images/works/3.jpg"
            ]
//            ,
//            fileList:[
//                "upload/works/1.jpg",
//                "upload/works/2.jpg",
//                "upload/works/3.jpg"
//            ],
//            fileZip:"upload/works/zips/dce74e53-e35f-4b69-846b-409950c93800.zip"
        };
    console.log("作品ID：" + req.params.workId);
//    res.status(400);
    res.json(work);
}

// 设计师发布设计
exports.submitWork = function(req, res){


    var workName = req.body.workName;
    var workPrice = req.body.workPrice;
    var workDescription = req.body.workDescription;
    var workFile = req.files.workFile;
    //workFile.originalFilename;
    var workPics = req.files.workPic;
    var workCover = req.files.workCover;
    var workCategoryId = req.body.workCategoryId;


    // 将文件移至指定文件夹
    var date = new Date();
    var folder = '' + date.getYear() + (date.getMonth()+1) + date.getDate()
    var path = "./public/upload/" + folder + "/";
    var db_path = 'upload/' + folder + '/';
    if (!fs.existsSync(path)) {
        fs.mkdirSync(path);
    }
    var wf_temp_path = workFile.path;
    var wf_temp_name = wf_temp_path.substring("./public/upload".length);
    fs.rename(wf_temp_path, path + wf_temp_name, function (err) {
        if(err){
            throw err;
        }
    });

    var wc_temp_path = workCover.path;
    var wc_temp_name = wc_temp_path.substring("./public/upload".length);
    var coverPath = db_path + wc_temp_name;
    fs.rename(wc_temp_path, path + wc_temp_name, function (err) {
        if(err){
            throw err;
        }
    });

    var workImages = new Array();
    for(var i = 0; i < workPics.length; i++){
        var wp_temp_path = workPics[i].path;
        var wp_temp_name = wp_temp_path.substring("./public/upload".length);
        workImages.push(db_path + wp_temp_name);
        fs.rename(wp_temp_path, path + wp_temp_name, function (err) {
            if(err){
                throw err;
            }
        });
    }

    // 向数据库中插入work项

    console.log("here");
    console.log("CoverIcon： " + path+wf_temp_name);
    var work = new Work({
        workId : generateUUID(),
        workName : workName,
        workPrice : workPrice,
        categoryId :workCategoryId,
        designerId : req.session.user.userId,
        workDesc : workDescription,
        workImage : workImages,
        coverIcon : coverPath
    });
    console.log("work: " + work);
    work.save(function (err, res) {
        if (err) {
            console.log("Error:" + err);
        }
        else {
            console.log("Res:" + res);
        }

    });

    // console.log(workFile);
    // console.log(workPics);
    // console.log(workCover);

    res.status(200)
    res.json({msg:'上传成功'});
}

// 获得设计师作品（已卖出和未卖出）
exports.getDesignerWorks = function(req, res){
    var self = this;


    var user = req.session.user;
    res.status(200);
    if(user == undefined || user.userType=='buyer'){
        res.status(403);
        res.json({msg:'请以设计师身份登录后重试'});
        return;
    }

    self.unsoldWorks = new Array();
    Work.find({designerId: 2}, function(err, works){
        if(err){
            console.log(err);
        }else{
            res.json({unsoldWorks:works});
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
                var count = 0;
                Category.findOne({id : categoryId}, function (err, category) {
                    if(err){
                        console.log(err);
                    }else{
                        // work.category = category;
                        // User.findOne({userId : 2}, function(err, user){
                        //     if(err){
                        //         console.log(err);
                        //     }else{
                        //         work.designer = user;
                        //         console.log(work);
                        //         self.unsoldWorks.push(work);
                        //         count ++;
                        //         if(count == size){
                        //             res.json({unsoldWorks:self.unsoldWorks,soldWorks:soldWorks});
                        //         }
                        //     }
                        // });
                    }
                });
            }
        }
    });

    var work =
    {
        workId:1324,
        workName:"蓝色的官网",
        workPrice:1600.00,
        category:{
            id:1,
            name:"social",
            text:"社交/论坛"
        },
        designer:{
            id:10001,
            name:"rrrmandy",
            icon:"images/avatars/10.png"
//                ,
//                balance:10000.00
        },
        workDesc:"为蓝色的产品设计的官网，希望大家喜欢\n\n换行测试",
        coverIcon:"images/product-details/1.jpg",
        fileZip:"upload/works/zips/dce74e53-e35f-4b69-846b-409950c93800.zip"
    };



    //var unsoldWorks = [work,work,work];
    var buyer = {
        userId:1,
        username:"李四",
        userType:"buyer",
        userIcon:""

    };
    var order = {
        orderId:10001,
        status:"paid",
        buyer:buyer,
        work:work
    }

    var order2 = {
        orderId:10002,
        status:"finished",
        buyer:buyer,
        work:work
    }

    var soldWorks = [order,order2,order2];

}

function generateUUID() {
    var d = new Date().getTime();
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = (d + Math.random()*16)%16 | 0;
        d = Math.floor(d/16);
        return (c=='x' ? r : (r&0x3|0x8)).toString(16);
    });
    return uuid;
};