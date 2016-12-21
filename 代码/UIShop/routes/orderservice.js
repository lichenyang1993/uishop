/**
 * Created with JetBrains WebStorm.
 * User: Administrator
 * Date: 16-12-17
 * Time: 下午11:20
 * To change this template use File | Settings | File Templates.
 */
//用户购买作品
exports.payOrders = function(req,res){
    // 一次请求包含多个作品，如果一个作品支付失败（已卖出或不存在）整体支付失败
    var user = req.session.user;
    res.status(200);
    if(user == undefined || user.userType=='designer'){
        res.status(403);
        res.json({msg:'请以买家身份登录后重试'});
        return;
    }
    var workIds = req.body.workIds;
    console.log(workIds);
    res.json({msg:'支付成功！'});
}

// 确认收货
exports.confirmPayOrder = function(req,res){
    // 一次请求包含多个作品，如果一个作品支付失败（已卖出或不存在）整体支付失败
    var user = req.session.user;
    res.status(200);
    if(user == undefined || user.userType=='designer'){
        res.status(403);
        res.json({msg:'请以买家身份登录后重试'});
        return;
    }
    var orderId =  req.params.orderId;
    console.log(orderId);
    res.json({msg:'确认收货成功！'});
}

// 获取买家订单
exports.getBuyerOrder = function (req, res) {
    var user = req.session.user;
    res.status(200);
    if(user == undefined || user.userType=='designer'){
        res.status(403);
        res.json({msg:'请以买家身份登录后重试'});
        return;
    }
    var orders = [
        {
            _id:"00011",
            status:"paid",
            designer: {
                _id: "585a16d18779cde400a26b2d",
                username: "张三",
                userType: "designer",
                userIcon: "images/avatars/3.png"
            },
            buyer:{
                _id: "585a16d18779cde400a26b2e",
                username: "李四",
                password: "123",
                userType: "buyer",
                __v: 0
            },
            work:{
                _id: "585a17b9d142d5d4088b8b95",
                workName: "测试作品",
                workPrice: 30000,
                category: null,
                designer: {
                    _id: "585a16d18779cde400a26b2d",
                    username: "张三",
                    userType: "designer",
                    userIcon: "images/avatars/3.png"
                },
                coverIcon: "upload/1161221/260-h8cg5o.0kvc3ul3di.png",
                workDesc: "这是一个测试说明",
                __v: 0,
                workImage: [
                    "upload/1161221/260-9bhjfu.beiegeqaor.png"
                ],
                fileZip: "upload/1161221/780-1ela3ik.p4e8doyldi.zip"
            }
        },
        {
            _id:"00011",
            status:"finished",
            designer: {
                _id: "585a16d18779cde400a26b2d",
                username: "张三",
                userType: "designer",
                userIcon: "images/avatars/3.png"
            },
            buyer:{
                _id: "585a16d18779cde400a26b2e",
                username: "李四",
                password: "123",
                userType: "buyer",
                __v: 0
            },
            work:{
                _id: "585a17b9d142d5d4088b8b95",
                workName: "测试作品",
                workPrice: 30000,
                category: null,
                designer: {
                    _id: "585a16d18779cde400a26b2d",
                    username: "张三",
                    userType: "designer",
                    userIcon: "images/avatars/3.png"
                },
                coverIcon: "upload/1161221/260-h8cg5o.0kvc3ul3di.png",
                workDesc: "这是一个测试说明",
                __v: 0,
                workImage: [
                    "upload/1161221/260-9bhjfu.beiegeqaor.png"
                ],
                fileZip: "upload/1161221/780-1ela3ik.p4e8doyldi.zip"
            }
        }
    ];
    res.json(orders);
}

// 获取设计师订单
exports.getDesignerOrder = function (req, res) {
    var user = req.session.user;
    res.status(200);
    if(user == undefined || user.userType=='buyer'){
        res.status(403);
        res.json({msg:'请以设计师身份登录后重试'});
        return;
    }
    var orders = [
        {
            _id:"00011",
            status:"paid",
            designer: {
                _id: "585a16d18779cde400a26b2d",
                username: "张三",
                userType: "designer",
                userIcon: "images/avatars/3.png"
            },
            buyer:{
                _id: "585a16d18779cde400a26b2e",
                username: "李四",
                password: "123",
                userType: "buyer",
                __v: 0
            },
            work:{
                _id: "585a17b9d142d5d4088b8b95",
                workName: "测试作品",
                workPrice: 30000,
                category: null,
                designer: {
                    _id: "585a16d18779cde400a26b2d",
                    username: "张三",
                    userType: "designer",
                    userIcon: "images/avatars/3.png"
                },
                coverIcon: "upload/1161221/260-h8cg5o.0kvc3ul3di.png",
                workDesc: "这是一个测试说明",
                __v: 0,
                workImage: [
                    "upload/1161221/260-9bhjfu.beiegeqaor.png"
                ],
                fileZip: "upload/1161221/780-1ela3ik.p4e8doyldi.zip"
            }
        },
        {
            _id:"00011",
            status:"finished",
            designer: {
                _id: "585a16d18779cde400a26b2d",
                username: "张三",
                userType: "designer",
                userIcon: "images/avatars/3.png"
            },
            buyer:{
                _id: "585a16d18779cde400a26b2e",
                username: "李四",
                password: "123",
                userType: "buyer",
                __v: 0
            },
            work:{
                _id: "585a17b9d142d5d4088b8b95",
                workName: "测试作品",
                workPrice: 30000,
                category: null,
                designer: {
                    _id: "585a16d18779cde400a26b2d",
                    username: "张三",
                    userType: "designer",
                    userIcon: "images/avatars/3.png"
                },
                coverIcon: "upload/1161221/260-h8cg5o.0kvc3ul3di.png",
                workDesc: "这是一个测试说明",
                __v: 0,
                workImage: [
                    "upload/1161221/260-9bhjfu.beiegeqaor.png"
                ],
                fileZip: "upload/1161221/780-1ela3ik.p4e8doyldi.zip"
            }
        }
    ];
    res.json(orders);
}