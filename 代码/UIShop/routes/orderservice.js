/**
 * Created with JetBrains WebStorm.
 * User: Administrator
 * Date: 16-12-17
 * Time: 下午11:20
 * To change this template use File | Settings | File Templates.
 */
//用户购买作品
var Order = require('../db/db_module/order');
var Work = require('../db/db_module/work');
var User = require('../db/db_module/user');
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
    var workCount = workIds.length
    var oders = new Array();

    // 在数据库中查找作品ID
    var count = 0;
    for(var i = 0; i < workCount; i++){
        console.log(workIds[i]);
        Work.findByIdAndUpdate({_id:workIds[i]},{workStatus:"paid"})
            .populate('designer','_id username userType userIcon',null)
            .populate('category','_id name text',null)
            .exec(function(err, res_work){
                if(err){
                    console.log(err);
                }else {
                    // 没有查到
                    if(res_work == null){
                        res.status(403);
                        res.json({msg:'作品不存在，无法购买'});
                        return;
                    }else{
                        console.log("work:" + res_work)
                        // 查找到了，创建订单，并保存到数据库
                        var order = new Order({
                            status: 'paid',
                            buyer: user._id,
                            work:res_work._id,
                            designer:res_work.designer
                        });
                        order.save(function(err,res_order){
                            if(err){
                                console.log(err);
                            }else{
                                // 如果没有保存上整个支付失败
                                if(res_order == null){
                                    res.status(403);
                                    res.json({msg:'订单创建失败，请重试'});
                                    return;
                                }else{
                                    console.log("res_order:" + res_order);
                                    // 保存订单成功了
                                    oders.push(order);
                                    count++;
                                    if(count == workCount){
                                        res.json({msg:'支付成功！'});
                                    }
                                }
                            }
                        });
                    }
                }
            });
    }
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

    Order.findByIdAndUpdate({_id:orderId},{status: "finished"}, function (err, order) {
        if(err){
            console.log(err);
        }else{
            Work.findByIdAndUpdate({_id:order.work},{status:"finished"},function(err,work){
                if(err){
                    console.log(err);
                }else{
                    console.log(work);
                    res.json({msg:'确认收货成功！'});
                }
            });
        }
    })
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
    Order.find({buyer:user._id})
        .populate('designer','_id username userType userIcon',null)
        .populate('work','_id workName workPrice category designer coverIcon workDesc workImage fileZip',null)
        .populate('buyer','_id username userType userIcon')
        .exec(function(err, orders){
            if(err){
                console.log(err);
            }else {
                res.json(orders);
            }
        });
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

    Order.find({designer:user._id, status:{$ne:'unpaid'}})
        .populate('designer','_id username userType userIcon',null)
        .populate('work','_id workName workPrice category designer coverIcon workDesc workImage fileZip',null)
        .populate('buyer','_id username userType',null)
        .exec(function(err, orders){
           if(err){
               console.log(err);
           } else{
               res.json(orders);
           }
        });
}
