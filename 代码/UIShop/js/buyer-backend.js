/**
 * Created with JetBrains WebStorm.
 * User: Administrator
 * Date: 16-12-12
 * Time: 下午10:49
 * To change this template use File | Settings | File Templates.
 */
var app = angular.module('ui-buyer-backend',['ngRoute','remoteValidation'])
    .config(['$routeProvider', function($routeProvider){
    $routeProvider
        .when('/',{templateUrl:'views/buyer-backend/dashboard.html'})
        .otherwise({redirectTo:'/'});
}]);
