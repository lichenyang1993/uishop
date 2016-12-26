/**
 * Created with JetBrains WebStorm.
 * User: Administrator
 * Date: 16-12-17
 * Time: 下午9:50
 * To change this template use File | Settings | File Templates.
 */
angular.module('ui-pay',['LocalStorageModule'])
    .controller('PayController',['localStorageService',
    function(localStorageService){
        localStorageService.add('backUrl','pay.html');
        window.location.href="login.html";
    }])
    .controller('LoginController',['$interval','localStorageService',
    function($interval,localStorageService){
        outer();
        var self = this;
        self.backUrl = localStorageService.get('backUrl');
        if(self.backUrl == undefined){
            self.backUrl = 'index.html';
        }
        self.list = [];
        $interval(function(){
            self.prompt="时间到啦";
        },1000,1);
        self.priceList = [1000,2000];
        self.totalPrice = function(){
            var sum = 0;
            for(var i = 0; i < self.priceList.length; i++){
                sum += self.priceList[i];
            }
            return sum;
        }
        self.addPrice = function(){
            self.priceList.push(1000);
        }
    }]);