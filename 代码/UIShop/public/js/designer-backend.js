/**
 * Created with JetBrains WebStorm.
 * User: Administrator
 * Date: 16-12-5
 * Time: 下午1:07
 * To change this template use File | Settings | File Templates.
 */
var app = angular.module('ui-designer-backend',['ngRoute','remoteValidation','LocalStorageModule'])
    .config(['$routeProvider', function($routeProvider){
    $routeProvider
        .when('/',{templateUrl:'views/designer-backend/dashboard.html'})
        .when('/my-work',{templateUrl:'views/designer-backend/my-work.html'})
//        .when('/sold-work',{templateUrl:'views/designer-backend/sold-work.html'})
//        .when('/unsend-order',{templateUrl:'views/designer-backend/unsend-order.html'})
//        .when('/unrecv-order',{templateUrl:'views/designer-backend/my-order.html'})
//        .when('/finish-order',{templateUrl:'views/designer-backend/finish-order.html'})
        .when('/new-work',{templateUrl:'views/designer-backend/new-work.html'})
        .when('/unfinished-workorder',{templateUrl:'views/designer-backend/unfinished-workorder.html'})
        .when('/finished-workorder',{templateUrl:'views/designer-backend/finished-workorder.html'})
        .otherwise({redirectTo:'/'});
}]);

app.directive("fileread", [function () {
    return {
        scope: {
            fileread: "="
        },
        link: function (scope, element, attributes) {
            element.bind("change", function (changeEvent) {
                var reader = new FileReader();
                reader.onload = function (loadEvent) {
                    scope.$apply(function () {
                        scope.fileread = loadEvent.target.result;
                    });
                }
                reader.readAsDataURL(changeEvent.target.files[0]);
            });
        }
    }
}]);

app.controller('DesignerHeaderController',['$scope','$location','$http','UserService',
    function($scope,$location,$http,UserService){
    var self = this;
    self.isActive = function (viewLocation) {
        return viewLocation === $location.path();
    };
    self.user = {};

    self.user.designerLogin = false;
    self.user.designerName = '';
    self.user.userId = 0;


    self.getLoginUser = function(){
        $http.get('/api/session').then(function(response){
//                console.log('获取当前登录用户',
//                response);
            if(response.data.userType=='designer'){
                self.user = response.data;
                self.user.designerLogin = true;
                self.user.designerName = response.data.username;
                self.user.userId = response.data.userId;
                UserService.setUser(self.user);
            }else if(response.data.userType=='buyer'){
                window.location.href="index.html";
            }else{
                window.location.href="index.html";
            }

        },function(errResponse){
            window.location.href="index.html";
        });
    };

    self.logout = function(){
        $http.delete('/api/session').then(function(response){
            self.user.designerLogin = false;
            self.user.designerName = '';
            self.user.userId = 0;
            window.location.href="index.html";
        });
    }
    self.getLoginUser();


}]);

app.factory('UserService',function(){
    var self = this;
    self.user = undefined;
    return {
        getUser:function(){
            return self.user;
        },
        setUser:function(user){
            self.user=user;
        }
    }
})

app.controller('NewWorkController',function() {
    initNewWorkFormValidate();
});

app.controller('DesignerAccountController',['$scope','UserService',
    function($scope,UserService){
    var self = this;
    $scope.$watch(function () { return UserService.getUser(); },function(user){
        self.user=user;
    });
}])

app.controller('DesignerWorkController',['$http','localStorageService',
    function($http,localStorageService){
    var self = this;
    self.init = function(){
        $http.get('/api/designer/work').then(function(response){
            self.unsoldWorks = response.data.unsoldWorks;
            self.soldWorks = response.data.soldWorks;
        },function(errResponse){
            if(errResponse.status == 403){
                localStorageService.add('backUrl','designer-backend.html#/my-work');
                localStorageService.add('prompt','请以设计师身份登录后重试');
                window.location.href="login.html";
            }
        });
    };
    self.init();

}]);