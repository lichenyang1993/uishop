/**
 * Created with JetBrains WebStorm.
 * User: Administrator
 * Date: 16-12-1
 * Time: 下午4:35
 * To change this template use File | Settings | File Templates.
 */

    var app = angular.module('uishop',['ngRoute','infinite-scroll'])
    .config(['$routeProvider', function($routeProvider){
        $routeProvider
            .when('/',{templateUrl:'views/main.html'})
            .when('/category',{templateUrl:'views/site-category.html'})
            .when('/searchWorks/:keyword', {templateUrl: 'views/search-result.html', controller: 'SearchWorksController'})
            .when('/works/:work_id', {templateUrl: 'views/work-detail.html', controller: 'WorkDetailController'})
            .when('/pay/:order_id', {templateUrl: 'views/pay.html', controller: 'PayController'})
            .when('/pay-success/', {templateUrl: 'views/pay-success.html'})
            .otherwise({redirectTo:'/'});
        }]);

    app.controller('HeaderController',['$scope','$location',function($scope,$location){
        $scope.isActive = function (viewLocation) {
            return viewLocation === $location.path();
        };
    }]);
    app.controller('SlideController', function($scope, $http) {
        $http.get("jsons/slides.json")
            .success(function (response) {
                $scope.slides = response.slides;
                setTimeout(function(){
                    $('.flexslider').flexslider({
                        animation: "slide"
                    });
                },100);
            });
    });
    app.controller('TopDesignerListController', function($scope, $http) {
        $http.get("jsons/top-designer-list.json")
            .success(function (response) {
                $scope.topDesigners = response.topDesigners;
            });
    });
    app.controller('EditorChosenController', function($scope, $http) {
        $http.get("jsons/editor-chosen-list.json")
            .success(function (response) {
                $scope.chosenItems = response.chosenItems;
            });
    });
    app.controller('CategoryController', function($scope, $http) {
        $http.get("jsons/category-list.json")
            .success(function (response) {
                $scope.categorys = response.categorys;
            });
    });

    app.controller('SearchWorksController',['$scope','$http','$routeParams','$rootScope','$location',
        function($scope, $http,$routeParams,$rootScope,$location) {
        $scope.isOver = false;
        $scope.curPage = 1;

        $scope.keyword = $routeParams.keyword;
        console.log($scope.keyword);
        this.keyword = $scope.keyword;

        if($scope.curPage == 1){
            $http.get("jsons/search-list.json")
                .success(function (response) {
                    $scope.products = response.products;
                    $scope.resultCount = response.resultCount;
                    $scope.curPage =  $scope.curPage + 1;
                    $scope.searchKw = $scope.keyword;
                });
        }

        $scope.searchWork = function(){
            $scope.keyword = this.keyword;
            console.log($scope.keyword);
            $scope.isOver = false;
            $scope.curPage = 1;
            var kw = $scope.keyword;
            if(kw.length == 0){
                return;
            }
            var path = "/searchWorks/" + kw;
            $location.path(path);
        }

        $scope.loadMore = function(){
            if($scope.isOver){
                return;
            }
            if($scope.curPage > 1){
                $http.get("jsons/search-list-"+$scope.curPage+".json")
                    .success(function (response) {
                        var length = response.products.length;
                        for(var i = 0; i < length; i++){
                            $scope.products.push(response.products[i]);
                        }
                        $scope.curPage =  $scope.curPage + 1;
                    })
                    .error(function (data, status, headers, config) {
                        $scope.isOver = true;
                        return status;
                    });
            }

        }

    }]);

    app.controller('WorkDetailController',['$scope','$http','$routeParams',
        function($scope, $http,$routeParams) {
            var work_id = $routeParams.work_id;
            console.log(work_id);

    }]);

    app.controller('PayController',['$scope','$http','$routeParams',
        function($scope, $http,$routeParams) {
            var order_id = $routeParams.order_id;
            console.log(order_id);

        }]);