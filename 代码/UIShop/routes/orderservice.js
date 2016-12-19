/**
 * Created with JetBrains WebStorm.
 * User: Administrator
 * Date: 16-12-17
 * Time: 下午11:20
 * To change this template use File | Settings | File Templates.
 */
//用户提交订单
// 参数是workId，如果workId无效（不存在或已售出)
// 检查用户是否登录，必须是以买家的身份登录。如果没有登录或者登录身份是设计师，返回403
// 如果
exports.createOrder = function (req, res) {
    var user = req.session.user;
    res.status(200);
    if(user == undefined || user.userType=='designer'){
        res.status(403);
        res.json({msg:'请以买家身份登录后重试'});
        return;
    }
    // 获取workId
    var workId = req.body.workId;
    console.log('提交订单 workId:' + workId);

    if(workId == undefined){
        res.status(404);
        res.json({msg:'作品不存在'});
        return;
    }

    work = {
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


    // 生成订单数据
    var order = {
        orderId:10001,
        status:"paid",
        buyer:buyer,
        work:work
    }


    // 保存订单数据
    var orders = req.session.orders;
    if(orders == undefined){
        orders = [];
        req.session.orders = orders;
    }
    req.session.orders.push(order);
    res.json(order);
}

exports.payOrder = function (req, res) {
    var user = req.session.user;
    res.status(200);
    if(user == undefined || user.userType=='designer'){
        res.status(403);
        res.json({msg:'请以买家身份登录后重试'});
        return;
    }

    var orderId = req.body.orderId;
    console.log("支付订单 orderId:" + orderId);
    var orders = req.session.orders;
    if(orders == undefined){
        res.status(404);
        res.json({msg:'未找到订单数据'});
        return;
    }
    var isFind = false;
    var orderIndex = -1;
    for(var i = 0; i < orders.length; i++){
        if(orderId == orders[i].orderId){
            isFind = true;
            orderIndex = i;
            break;
        }
    }
    if(!isFind){
        res.status(404);
        res.json({msg:'未找到订单数据'});
        return;
    }

    // 进行支付
    req.session.orders[orderIndex].status="paid";
    req.session.orders[orderIndex].fileZip="/upload/works/zips/dce74e53-e35f-4b69-846b-409950c93800.zip";
    res.json({msg:'支付成功'});
}

exports.getBuyerOrder = function (req, res) {
    var user = req.session.user;
    res.status(200);
    if(user == undefined || user.userType=='designer'){
        res.status(403);
        res.json({msg:'请以买家身份登录后重试'});
        return;
    }
    var orders = req.session.orders;
    if(orders == undefined || orders.length == 0){
        res.json([]);
        return;
    }
    var buyOrderList = [];
    for(var i = 0; i < orders.length; i++){
        if(orders[i].buyer.userId == user.userId &&
            (orders[i].status=='paid' || orders[i].status=='finished')){
            buyOrderList.push(orders[i]);
        }
    }
    res.json(buyOrderList);
}