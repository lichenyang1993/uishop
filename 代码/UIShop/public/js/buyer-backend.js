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

app.controller('OrderController',['$http','localStorageService',
    function($http,localStorageService){
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
    self.init();
}]);