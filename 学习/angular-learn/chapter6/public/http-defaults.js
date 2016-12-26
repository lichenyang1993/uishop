// File: chapter6/public/http-defaults.js

angular.module('notesApp', [])
    .controller('LoginCtrl',['$http',function($http){
        var self = this;
        self.user = {};
        self.message  = 'Please login';
        self.login = function(){
            $http.post('/api/login', self.user).then(
                function(resp) {
                    self.message = resp.data.msg;
                }
            );
        };
    }])
    .config(['$httpProvider', function($httpProvider) {
        //仿照jQuery风格POST数据
        $httpProvider.defaults.transformRequest.push(
            function(data) {
                var requestStr;
                if(data) {
                    data = JSON.parse(data);
                    for(var key in data){
                        if(requestStr) {
                            requestStr += '&' + key + '=' + data[key];
                        }else {
                            requestStr += key + '=' + data[key];
                        }
                    }
                }
                return requestStr;
            }
        );
        // 对于所有以POST方式提交的请求，将它们的content type设置为FORM
        $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
    }]);