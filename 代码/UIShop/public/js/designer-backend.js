/**
 * Created with JetBrains WebStorm.
 * User: Administrator
 * Date: 16-12-5
 * Time: 下午1:07
 * To change this template use File | Settings | File Templates.
 */
var app = angular.module('ui-designer-backend',['ngRoute','remoteValidation'])
    .config(['$routeProvider', function($routeProvider){
    $routeProvider
        .when('/',{templateUrl:'views/designer-backend/dashboard.html'})
        .when('/unsold-work',{templateUrl:'views/designer-backend/unsold-work.html'})
        .when('/sold-work',{templateUrl:'views/designer-backend/sold-work.html'})
        .when('/unsend-order',{templateUrl:'views/designer-backend/unsend-order.html'})
        .when('/unrecv-order',{templateUrl:'views/designer-backend/my-order.html'})
        .when('/finish-order',{templateUrl:'views/designer-backend/finish-order.html'})
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

app.controller('DesignerHeaderController',['$location','$http',function($location,$http){
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
                self.user.designerLogin = true;
                self.user.designerName = response.data.username;
            }else if(response.data.userType=='buyer'){
                window.location.href="index.html";
            }else{
                window.location.href="index.html";
            }
            self.userId = response.data.userId;
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



app.controller('NewWorkController',function($scope, $http,$compile) {
    $scope.picCount = 1; // 图片计数
    $scope.addBigPic = function (){
        console.log("添加大图");
        var workPicDiv = document.getElementById("workPicDiv");

        $scope.picCount = $scope.picCount + 1;

        // 添加div
//        <div class="workPicItem">
//            <input type="file" name="workBigPic1" class="form-control">
//            <button class="btn btn-danger btn-sm workPicDel">删除</button>
//        </div>
        var workItem = document.createElement("div");
        workItem.className = "workPicItem";

        var input = document.createElement('input');
        input.setAttribute('type','file');
        input.setAttribute('name','workBigPic'+$scope.picCount);
        input.setAttribute('id','workBigPic'+$scope.picCount);
        input.className = 'form-control pic-file';

        var btn = document.createElement('button');
        btn.className = "btn btn-danger btn-sm workPicDel";
        btn.innerHTML = "删除";
        btn.setAttribute("ng-click","deletePic($event);");
        workItem.appendChild(input);
        workItem.appendChild(btn);

        angular.element(workPicDiv).append( $compile(workItem.outerHTML)($scope) )

    }

    $scope.deletePic = function($event){
        var workPicDiv = document.getElementById("workPicDiv");
        var btn = angular.element($event.currentTarget);
        var parent = btn[0].parentNode;
        workPicDiv.removeChild(parent);
    }

    $scope.saveNewWork = function(){
        var fd = new FormData();
        fd.append('workName',$scope.workName);

        var cover = document.getElementById('workCover');
        fd.append('workCover',cover.files[0]);
        fd.append('price',$scope.price);
        fd.append('workDescription',$scope.workDescription);

        var bigPics = document.getElementsByClassName("pic-file");
        for(var i = 0; i < bigPics.length; i++){
            fd.append(bigPics[i].getAttribute('name'),bigPics[i].files[0]);
        }
        $http.post('upload.php', fd, {
            transformRequest: angular.identity,
            headers: {'Content-Type': undefined}
        })
            .success(function (data, status, headers, config) {
            })
            .error(function (data, status, header, config) {
            });
    }
});