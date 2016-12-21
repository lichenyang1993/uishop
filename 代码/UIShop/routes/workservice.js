/**
 * Created with JetBrains WebStorm.
 * User: Administrator
 * Date: 16-12-15
 * Time: 下午11:08
 * To change this template use File | Settings | File Templates.
 */
var fs = require('fs');
var Work = require('../db/db_module/work');
var Category = require('../db/db_module/category');
var User =require('../db/db_module/user');
exports.searchWork = function (req, res) {
    console.log(req.query.pageNum);
    console.log(req.query.keyword);

    var pageNum = req.query.pageNum;
    var keyword = req.query.keyword;

    if(pageNum <= 1 || pageNum == undefined){
        pageNum = 1;
        console.log(pageNum);
    }

    Work.find({workName: eval("/"+keyword+"/i")})
        .populate('designer','_id username userType userIcon',null)
        .populate('category','_id name text',null)
        .exec(function(err, res_works){
            if(err){
                console.log(err);
                res.status(404);
                res.json({msg:'未找到相关作品'});
            }else {
                var searchResult = {};
                var works = new Array();
                var workSize = res_works.length;
                console.log(workSize);
                for(var i = 0 + (pageNum-1)*10; i < (workSize<10?workSize:10); i++){
                    works.push(res_works[i]);
                }
                //console.log("here");
                //console.log(res_works);
                searchResult.works = works;
                searchResult.resultCount = workSize;
                res.status(200);
                res.json(searchResult);

            }
        });


//     var searchResult = {
//         works : [
//             {
//                 workId:1324,
//                 workName:"蓝色的官网",
//                 workPrice:1600.00,
//                 category:{
//                     id:1,
//                     name:"social",
//                     text:"社交/论坛"
//                 },
//                 designer:{
//                     id:10001,
//                     name:"rrrmandy",
//                     icon:"images/avatars/10.png"
// //                    ,balance:10000.00
//                 },
//                 workDesc:"为蓝色的产品设计的官网，希望大家喜欢\n\n换行测试",
//                 coverIcon:"images/product-details/1.jpg",
//                 images:[
//                     "images/works/1.jpg",
//                     "images/works/2.jpg",
//                     "images/works/3.jpg"
//                 ]
// //                ],
// //                fileList:[
// //                    "upload/works/1.jpg",
// //                    "upload/works/2.jpg",
// //                    "upload/works/3.jpg"
// //                ],
// //                fileZip:"upload/works/zips/dce74e53-e35f-4b69-846b-409950c93800.zip"
//             }
//         ],
//         resultCount:2
//     };
//     console.log(req.query.pageNum);
//     console.log(req.query.keyword);
//     res.status(200);
//     res.json(searchResult);
}

// 根据Id获取作品详情
exports.getWorkById = function (req, res) {
    console.log("作品ID：" + req.params.workId);

    Work.findOne({_id:req.params.workId})
        .populate('designer','_id username userType userIcon',null)
        .populate('category','_id name text',null)
        .exec(function(err, work){
            if(err){
                console.log(err);
                res.status(404);
                res.json({msg:'未找到相关作品'});
            }else {
                res.json(work);
            }
        });





//     var work =
//         {
//             workId:1324,
//             workName:"蓝色的官网",
//             workPrice:1600.00,
//             category:{
//                 id:1,
//                 name:"social",
//                 text:"社交/论坛"
//             },
//             designer:{
//                 id:10001,
//                 name:"rrrmandy",
//                 icon:"images/avatars/10.png"
// //                ,
// //                balance:10000.00
//             },
//             workDesc:"为蓝色的产品设计的官网，希望大家喜欢\n\n换行测试",
//             coverIcon:"images/product-details/1.jpg",
//             images:[
//                 "images/works/1.jpg",
//                 "images/works/2.jpg",
//                 "images/works/3.jpg"
//             ]
// //            ,
// //            fileList:[
// //                "upload/works/1.jpg",
// //                "upload/works/2.jpg",
// //                "upload/works/3.jpg"
// //            ],
// //            fileZip:"upload/works/zips/dce74e53-e35f-4b69-846b-409950c93800.zip"
//         };
//     console.log("作品ID：" + req.params.workId);
// //    res.status(400);
//     res.json(work);
}

// 设计师发布设计
exports.submitWork = function(req, res){

    // 检查用户权限
    var user = req.session.user;
    res.status(200);
    if(user == undefined || user.userType=='buyer'){
        res.status(403);
        res.json({msg:'请以设计师身份登录后重试'});
        return;
    }

    // 获取提交的信息
    //workFile.originalFilename;
    var workName = req.body.workName;// 作品名
    var workPrice = req.body.workPrice;// 作品价格
    var workDescription = req.body.workDescription;// 作品描述
    console.log("workDescription:" + workDescription);
    var workFile = req.files.workFile;// 作品文件
    var workPics = req.files.workPic;// 作品图片
    var workCover = req.files.workCover;// 作品封面
    var workCategoryId = req.body.workCategoryId;// 作品分类ID
    var designerId = user._id;

    // 将文件移动到指定的文件夹
    var date = new Date();
    var folder = '' + date.getYear() + (date.getMonth()+1) + date.getDate()
    var path = "./public/upload/" + folder + "/";   // 要存放的路径
    var db_path = 'upload/' + folder + '/'; // 数据库中存放的文件路径

    if (!fs.existsSync(path)) {
        fs.mkdirSync(path);
    }

    // 移动作品压缩文件
    var wf_temp_path = workFile.path;
    var wf_temp_name = wf_temp_path.substring("./public/upload".length);
    fs.rename(wf_temp_path, path + wf_temp_name, function (err) {
        if(err){
            throw err;
        }
    });

    // 移动作品封面文件
    var wc_temp_path = workCover.path;
    var wc_temp_name = wc_temp_path.substring("./public/upload".length);
    var coverPath = db_path + wc_temp_name;
    fs.rename(wc_temp_path, path + wc_temp_name, function (err) {
        if(err){
            throw err;
        }
    });

    // 移动作品图片文件
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
    var work = new Work({
        workName : workName,
        workPrice : workPrice,
        category :workCategoryId,
        designer : designerId,
        workDesc : workDescription,
        workImage : workImages,
        coverIcon : coverPath
    });
    console.log("work: " + work);
    work.save(function (err, work) {
        if (err) {
            console.log("Error:" + err);
            //res.status(403);
            //res.json({msg:'上传失败, 发生错误: ' + err });
        }
    });
    res.status(200);
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

    // 查询当前设计师未售出的设计作品
    Work.find({designer:user._id})
        .populate('designer','_id username userType userIcon',null)
        .populate('category','_id name text',null)
        .exec(function(err, docs){
            if(err){
                console.log(err);
            }else {
                res.json({unsoldWorks: docs});
            }
        });

}