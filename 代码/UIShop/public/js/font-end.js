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
            .when('/searchWorks', {templateUrl: 'views/search-result.html'})
            .when('/works/:work_id', {templateUrl: 'views/work-detail.html', controller: 'WorkDetailController'})
            .when('/pay/:order_id', {templateUrl: 'views/pay.html', controller: 'PayController'})
            .when('/pay-success/', {templateUrl: 'views/pay-success.html'})
            .otherwise({redirectTo:'/'});
        }]);

    app.controller('HeaderController',['$location','$http',function($location,$http){
        var self = this;
        self.isActive = function (viewLocation) {
            return viewLocation === $location.path();
        };

        self.designerLogin = false;
        self.designerName = '';
        self.buyerLogin = false;
        self.buyerName = '';
        self.userId = 0;

        self.getLoginUser = function(){
            $http.get('/api/session').then(function(response){
//                console.log('获取当前登录用户',
//                response);
                if(response.data.userType=='designer'){
                    self.designerLogin = true;
                    self.designerName = response.data.username;

                    self.buyerLogin = false;
                    self.buyerName = '';
                }else if(response.data.userType=='buyer'){
                    self.buyerLogin = true;
                    self.buyerName = response.data.username;

                    self.designerLogin = false;
                    self.designerName = '';
                }
                self.userId = response.data.userId;
            },function(errResponse){

            });
        };

        self.logout = function(){
            $http.delete('/api/session').then(function(response){
                self.designerLogin = false;
                self.designerName = '';
                self.buyerLogin = false;
                self.buyerName = '';
                self.userId = 0;
            });
        }
        self.getLoginUser();


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

    app.controller('SearchWorkController',['SearchWorkService','$http','$location',function(SearchWorkService,$http,$location) {
        var self = this;

        self.keywork = '';
        self.searchWork = function(){
            SearchWorkService.searchWork(self.keyword).then(function(){
                $location.path("searchWorks");
            });
        };
//        self.loadMore = function(){
//            if(self.pageNum == undefined){
//                self.pageNum = 1;
//            }
//            $http({
//                url: "/api/work",
//                method: "GET",
//                params: {keyword: self.keyword,pageNum : self.pageNum+1}
//            }).then(
//                function(response){
//                    if(self.works == undefined){
//                        self.works = response.data;
//                    }
//                    for(var i = 0; i < response.data.length; i++){
//                        self.works.push(response.data[i]);
//                    }
//                    self.pageNum = self.pageNum + 1;
//                }
//            );
//        }
    }]);

    app.controller('SearchResultController',['SearchWorkService','$scope',
        function(SearchWorkService,$scope){
        var self = this;
        self.searchKw = SearchWorkService.getKeyword();
        self.loadMore = SearchWorkService.loadMore();
        $scope.$watch(function () { return SearchWorkService.getKeyword(); },function(kw){
            self.searchKw = kw;
        });
        $scope.$watch(function () { return SearchWorkService.getWorks(); },function(works){
            self.works = works;
        });
        $scope.$watch(function () { return SearchWorkService.getResultCount(); },function(count){
            self.resultCount = count;
        })

//        self.works=["fdas","fdasf"];
    }]);
    app.factory('SearchWorkService',['$http',function($http){
        var pageNum = 1;
        var keyword = '';
        var works = [];
        var searchKw = '';
        var resultCount = 0; // 结果数

        return {
            searchWork : function(kw){
                keyword = kw;
                return $http({
                    url: "/api/work",
                    method: "GET",
                    params: {keyword: keyword}
                }).then(
                    function(response){
                        works = response.data.works;
                        resultCount = response.data.resultCount;
                        pageNum = 1;
                        searchKw = keyword;
                    }
                );
            },
            loadMore : function(){
                $http({
                    url: "/api/work",
                    method: "GET",
                    params: {keyword: keyword,pageNum : pageNum+1}
                }).then(
                    function(response){
                        if(works == undefined){
                            works = response.data.works;
                            return;
                        }
                        for(var i = 0; i < response.data.works.length; i++){
                            works.push(response.data.works[i]);
                        }
                        pageNum = pageNum + 1;
                    }
                );
            },
            getKeyword:function(){
                return searchKw;
            },
            getWorks:function(){
                return works;
            },
            getResultCount:function(){
                return resultCount;
            }

        }
    }]);

//    app.controller('SearchWorksController',['$scope','$http','$routeParams','$rootScope','$location',
//        function($scope, $http,$routeParams,$rootScope,$location) {
//        $scope.isOver = false;
//        $scope.curPage = 1;
//
//        $scope.keyword = $routeParams.keyword;
//        console.log($scope.keyword);
//        this.keyword = $scope.keyword;
//
//        if($scope.curPage == 1){
//            $http.get("jsons/search-list.json")
//                .success(function (response) {
//                    $scope.products = response.products;
//                    $scope.resultCount = response.resultCount;
//                    $scope.curPage =  $scope.curPage + 1;
//                    $scope.searchKw = $scope.keyword;
//                });
//        }
//
//        $scope.searchWork = function(){
//            $scope.keyword = this.keyword;
//            console.log($scope.keyword);
//            $scope.isOver = false;
//            $scope.curPage = 1;
//            var kw = $scope.keyword;
//            if(kw.length == 0){
//                return;
//            }
//            var path = "/searchWorks/" + kw;
//            $location.path(path);
//        }
//
//        $scope.loadMore = function(){
//            if($scope.isOver){
//                return;
//            }
//            if($scope.curPage > 1){
//                $http.get("jsons/search-list-"+$scope.curPage+".json")
//                    .success(function (response) {
//                        var length = response.products.length;
//                        for(var i = 0; i < length; i++){
//                            $scope.products.push(response.products[i]);
//                        }
//                        $scope.curPage =  $scope.curPage + 1;
//                    })
//                    .error(function (data, status, headers, config) {
//                        $scope.isOver = true;
//                        return status;
//                    });
//            }
//
//        }
//
//    }]);

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