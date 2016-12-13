/**
 * Created with JetBrains WebStorm.
 * User: Administrator
 * Date: 16-12-13
 * Time: 下午4:16
 * To change this template use File | Settings | File Templates.
 */
angular.module('uishop-login',[])
    .controller('LoginController',['UserService','$location',function(UserService,$location){
        var self = this;

        self.login = function(){
            console.log(self.user);
            UserService.login(self.user).then(function(){
                self.loginError = false;
                $location.path('index.html');
            },function(){
                self.loginError = true;
            });
        }

    }])
    .factory('UserService',['$http',function($http){
        return {
            login : function(user){
                return $http.post('/api/user',user);
            }
        };
    }]);