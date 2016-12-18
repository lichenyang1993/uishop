/**
 * Created with JetBrains WebStorm.
 * User: Administrator
 * Date: 16-12-15
 * Time: 下午11:08
 * To change this template use File | Settings | File Templates.
 */
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