/**
 * Created with JetBrains WebStorm.
 * User: Administrator
 * Date: 16-12-12
 * Time: 下午10:49
 * To change this template use File | Settings | File Templates.
 */
var app = angular.module('ui-buyer-backend',['ngRoute','remoteValidation','LocalStorageModule'])
    .config(['$routeProvider', function($routeProvider){
    $routeProvider
//        .when('/',{templateUrl:'views/buyer-backend/dashboard.html'})
        .when('/',{redirectTo:'/my-order'})
        .when('/my-order',{templateUrl:'views/buyer-backend/my-order.html'})
        .when('/confirm-pay',{templateUrl:'views/buyer-backend/confirm-pay.html'})
        .when('/confirm-pay-fail',{templateUrl:'views/buyer-backend/confirm-pay-fail.html'})
        .when('/customer-service/:work_id',{templateUrl:'views/buyer-backend/customer-service.html'})
        .otherwise({redirectTo:'/'});
}]);

app.controller('BuyerHeaderController',['$location','$http','localStorageService',
    function($location,$http,localStorageService){
    var self = this;
    self.user = {};

    self.user.buyerLogin = false;
    self.user.buyerName = '';
    self.user.userId = 0;


    self.getLoginUser = function(){
        $http.get('/api/session').then(function(response){
//                console.log('获取当前登录用户',
//                response);
            if(response.data.userType=='buyer'){
                self.user.buyerLogin = true;
                self.user.buyerName = response.data.username;
            }else{
                localStorageService.add('backUrl','buyer-backend.html');
                localStorageService.add('prompt','请以买家身份登录后重试');
                window.location.href="login.html";
            }
            self.userId = response.data.userId;
        },function(errResponse){
            localStorageService.add('backUrl','buyer-backend.html');
            localStorageService.add('prompt','请以买家身份登录后重试');
            window.location.href="login.html";
        });
    };

    self.logout = function(){
        $http.delete('/api/session').then(function(response){
            self.user.buyerLogin = false;
            self.user.buyerName = '';
            self.user.userId = 0;
            window.location.href="index.html";
        });
    }
    self.getLoginUser();


}]);

app.controller('ConfirmPayController',['$interval','$location',
    function($interval,$location){
        var self= this;
        $interval(function(){
            $location.path('my-order');
        },1500,1);
    }]);

app.controller('CustomerServiceController',['$routeParams',function($routeParams){
    var self = this;
    self.workId = $routeParams.work_id;

}]);

app.controller('OrderController',['$http','$location','localStorageService',
    function($http,$location,localStorageService){
    var self = this;

    self.init = function(){
        $http.get('/api/buyer/order').then(function(response){
           self.orders = response.data;
        },function(errResponse){
            localStorageService.add('backUrl','buyer-backend.html');
            localStorageService.add('prompt','请以买家身份登录后重试');
            window.location.href="login.html";
        });
    };
    self.confirmPay = function(orderId){
        console.log(orderId);
        if(!confirm("款项将直接转到设计师的账户，要确认收货吗？"))
        {
            return;
        }
        $http.put('/api/order/' + orderId).then(function(){
            $location.path('confirm-pay');
        },function(errResponse){
            if(errResponse.status==403){
                localStorageService.add('backUrl','buyer-backend.html');
                localStorageService.add('prompt','请以买家身份登录后重试');
                window.location.href="login.html";
            }
            if(errResponse.status==404){
                $location.path('confirm-pay-fail');
            }
        });
    }
    self.init();
}]);