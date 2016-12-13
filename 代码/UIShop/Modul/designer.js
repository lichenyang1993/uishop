/**
 * Created by Administrator on 2016/12/13 0013.
 */
function Designer(id, username, password, icon, balance){
    this.id = id;
    this.username = username;
    this.password = password;
    this.icon = icon;
    this.balance = balance;
}
exports.Designermodel = Designer;

function Work(workId, workName, workPrice, designerId, workDesc, coverIcon, images, fileList, fileZip){

}

function Order(orderId , orderState, workId, desginerId, buyerId){

}

function Buyer(id, username, password) {

}





/**
 * Created by Administrator on 2016/12/13 0013.
 */
function Designer(id, username, password, icon, balance){
    this.id = id;
    this.username = username;
    this.password = password;
    this.icon = icon;
    this.balance = balance;
}
exports.Designermodel = Designer;

function Work(workId, workName, workPrice, designer, workDesc, coverIcon, images, fileList, fileZip){

}

function Order(orderId , orderState, work, desginer, buyer){

}

function Buyer(id, username, password) {

}