/**
 * Created with JetBrains WebStorm.
 * User: Administrator
 * Date: 16-12-15
 * Time: 下午11:08
 * To change this template use File | Settings | File Templates.
 */
var fs = require('fs');
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
    var user = req.session.user;
    res.status(200);
    if(user == undefined || user.userType=='designer'){
        res.status(403);
        res.json({msg:'请以买家身份登录后重试'});
        return;
    }
    var date = new Date();
    var folder= '' + date.getYear() + date.getMonth() + date.getDate();
    console.log('folder:' + folder);
    var app = require('../app');
    var dirPath = app.getPath();


    var workName = req.body.workName;
    var workPrice = req.body.workPrice;
    var workDescription = req.body.workDescription;
    var workFile = req.files.workFile;
    var workPic = req.files.workPic;
    var workCover = req.files.workCover;

    console.log(workFile);
    console.log(workPic);
    console.log(workCover);

    // path = workFile.path;
    // var fileName = path.substring(dirPath.length);
    // console.log(fileName);
    //
    // workFile.rename(file.path, '', function(err){
    //     if (err) throw err;
    // });


    // var upfile = req.files;
    // var files = [];
    //
    // if (upfile instanceof  Array) {
    //     files = upfile;
    // } else {
    //     files.push(upfile);
    // }
    // for(var i = 0; i < files.length; i++){
    //     console.log('here');
    //     var file = files[0];
    //     console.log(file);
    // }


    // for (var i = 0; i < files.length; i++) {
    //     var file = files[i];
    //     var path = file.path;
    //     var name = file.name;
    //     var target_path = "./upload/" + name;
    //
    //     fs.rename(path, target_path, function (err) {
    //         if (err) throw err;
    //     });
    // }

    res.status(200)
    res.json({msg:'上传成功'});
}

// 获得设计师作品（已卖出和未卖出）
exports.getDesignerWorks = function(req, res){
    var user = req.session.user;
    res.status(200);
    if(user == undefined || user.userType=='buyer'){
        res.status(403);
        res.json({msg:'请以设计师身份登录后重试'});
        return;
    }
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

    var unsoldWorks = [work,work,work];
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
    res.json({unsoldWorks:unsoldWorks,soldWorks:soldWorks});
}