/**
 * Created with JetBrains WebStorm.
 * User: Administrator
 * Date: 16-12-1
 * Time: 下午4:35
 * To change this template use File | Settings | File Templates.
 */
Array.prototype.baoremove = function(dx)
{
    if(isNaN(dx)||dx>this.length){return false;}
    this.splice(dx,1);
}

var app = angular.module('uishop',['ngRoute','infinite-scroll','LocalStorageModule'])
    .config(['$routeProvider', function($routeProvider){
        $routeProvider
            .when('/',{templateUrl:'views/main.html'})
            .when('/category',{templateUrl:'views/site-category.html'})
            .when('/category/:categoryId',{templateUrl:'views/category-result.html'})
            .when('/searchWorks', {templateUrl: 'views/search-result.html'})
            .when('/work/:work_id', {templateUrl: 'views/work-detail.html'})
            .when('/pay/:work_id', {templateUrl: 'views/pay.html'})
            .when('/pay-success', {templateUrl: 'views/pay-success.html'})
            .when('/pay-fail', {templateUrl: 'views/pay-fail.html'})
            .when('/shop-cart', {templateUrl: 'views/shop-cart.html'})
            .otherwise({redirectTo:'/'});
        }]);

    app.factory('ShopCartService',['localStorageService',function(localStorageService){
        var self = this;
        var observerCallbacks = [];
        //register an observer
//        self.registerObserverCallback = function(callback){
//            observerCallbacks.push(callback);
//        };

        //call this when you know 'foo' has been changed
        var notifyObservers = function(){
            angular.forEach(observerCallbacks, function(callback){
                callback();
            });
        };

        self.works = [];
        // load一下
        self.works = localStorageService.get('localShopCartWork');
        if(self.works == undefined){
            self.works = [];
        }
        notifyObservers();
        self.updateLocalWork = function(){
            localStorageService.set('localShopCartWork',self.works);
        }
        return{
            registerObserverCallback:function(callback){
                observerCallbacks.push(callback);
            },
            removeWork : function(workId){
                for(var i = 0; i < self.works.length; i++){
                    if(self.works[i]._id == workId){
                        self.works.baoremove(i);
                        self.updateLocalWork();
                        notifyObservers();
                        break;
                    }
                }
            },
            getWorks: function(){
                return self.works;
            },
            deleteAllWorks:function(){
                self.works = [];
                self.updateLocalWork();
                notifyObservers();
            },
            addWork: function(work){
                if(work == undefined){
                    return false;
                }
                // 不能添加id相同的作品
                for(var i = 0; i < self.works.length; i++){
                    if(self.works[i]._id == work._id){
                        return false;
                    }
                }
                self.works.push(work);
                self.updateLocalWork();
                notifyObservers();
                return true;
            }
        }
    }]);

    app.controller('ShopCartController',['$scope','$http','$location','ShopCartService','localStorageService',
        function($scope,$http,$location,ShopCartService,localStorageService){
        var self = this;

        $scope.$watch(function () { return ShopCartService.getWorks(); },function(works){
            self.works = works;
        });
        self.goBack = function(){
            history.back();
        }

        self.removeWork = function(workId){
            ShopCartService.removeWork(workId);
        }

        self.pay = function(){
            if(self.works == undefined || self.works.length == 0){
                return;
            }
            // 获取作品的id列表
            var workIds = [];
            for(var i = 0; i < self.works.length; i++){
                workIds.push(self.works[i]._id);
            }
            $http.post('/api/order',{workIds:workIds}).then(function(){
                ShopCartService.deleteAllWorks();
                $location.path('pay-success');
            },function(errResponse){
                if(errResponse.status == 403){
                    localStorageService.add('backUrl','index.html#/shop-cart');
                    localStorageService.add('prompt',errResponse.data.msg);
                    window.location.href = "login.html";
                }
                if(errResponse.status == 404){
                    window.location.href = "index.html";
                }
            });
        }

        self.totalPrice = function(){
            var sum = 0;
            if(self.works == undefined || self.works.length == 0){
                return 0;
            }
            for(var i = 0; i < self.works.length; i++){
                sum += self.works[i].workPrice;
            }
            return sum;
        }
    }])

    app.controller('HeaderController',['$location','$http','$scope','ShopCartService',
        function($location,$http,$scope,ShopCartService){
        var self = this;
        var updateShopCart = function(){
            self.shopWorkCount = ShopCartService.getWorks().length;
        };
        ShopCartService.registerObserverCallback(updateShopCart);

        self.isActive = function (viewLocation) {
            return viewLocation === $location.path();
        };

        self.shopWorkCount = ShopCartService.getWorks().length;
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
                window.location.href="login.html";
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
    }]);

    app.controller('WorkCategoryController',['$http',function($http){
        var self = this;
        self.pageCount = 1;
        self.isLoad = false;

        $http.get('/jsons/search-list.json').then(function(response){
            self.pageCount = 1;
            self.works = response.data.products;
        })

        self.loadMore = function(){
            if(self.isLoad){
                return;
            }
            self.isLoad = true;
            var pageNum = self.pageCount + 1;
            $http.get('/jsons/search-list-'+pageNum+'.json').then(function(response){
                self.pageCount = self.pageCount + 1;
                var ws = response.data.products;
                for(var i = 0; i < ws.length; i++){
                    self.works.push(ws[i]);
                }
                self.isLoad = false;
            },function(){
//                self.isLoad = false;
            })
        }
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

    app.controller('WorkDetailController',['$scope','$http','$routeParams','$location','$interval','ShopCartService',
        function($scope, $http,$routeParams,$location,$interval,ShopCartService) {
            var self = this;
            self.workId = $routeParams.work_id;
            console.log(self.workId);
            $http.get('/api/work/' + self.workId).then(function(response){
                self.work = response.data;
                console.log(response.data);
            },function(errResponse){
                // 网络请求出错，返回主页
                $location.path('#/');
            });
            self.addToCart = function(){
                var addResult = ShopCartService.addWork(self.work);
                self.addPrompt = {
                    success:true,
                    msg:"加入购物车成功!"
                };
                if(!addResult){
                    self.addPrompt = {
                        success:false,
                        msg:"不能重复添加该作品"
                    };
                }
                $interval(function(){
                    self.addPrompt = undefined;
                },1000,1);
            }
    }]);

    app.controller('PayController',['$http','$routeParams','$window','$location','localStorageService',
        function( $http,$routeParams,$window,$location,localStorageService) {
            var self = this;
            self.workId = $routeParams.work_id;
            var order = {workId:self.workId};
            console.log("支付页 workId：" + self.workId);
            $http.post('/api/order',order).then(function(response){
                self.order = response.data;
                console.log(self.order);
            },function(errResponse){
                if(errResponse.status == 403){
                    localStorageService.add('backUrl','index.html#/pay/'+self.workId);
                    localStorageService.add('prompt',errResponse.data.msg);
                    $window.location.href = "login.html";
                }
                if(errResponse.status == 404){
                    $window.location.href = "index.html";
                }
            });
            // 支付
            self.pay = function(){
                $http.put('/api/order',self.order).then(function(response){
                    // 支付成功，跳转到支付成功页
                    $location.path('pay-success');
                },function(errResponse){
                    if(errResponse.status == 403){
                        localStorageService.add('backUrl','index.html#/pay/'+self.workId);
                        localStorageService.add('prompt',errResponse.data.msg);
                        $window.location.href = "login.html";
                    }
                    if(errResponse.status == 404){
                        // 重新创建订单
//                        $window.location.href = "index.html#/work/"+self.workId;
                        localStorageService.add('backUrl','index.html#/pay/'+self.workId);
                        $location.path('pay-fail');
                    }
                });
            };
        }]);

    app.controller('PayFailController',['$interval','$window','localStorageService',
        function($interval,$window,localStorageService){
            var self= this;
            $interval(function(){
                self.backUrl = localStorageService.get('backUrl');
                if(self.backUrl == undefined){
                    self.backUrl = 'index.html';
                }
                localStorageService.remove('backUrl');
                $window.location.href = self.backUrl;
            },1000,1);
        }]);

    app.controller('PaySuccessController',['$interval','$window',
        function($interval,$window){
            var self= this;
            $interval(function(){
                $window.location.href = 'buyer-backend.html';
            },1000,1);
        }]);

    app.controller('LoginController',['UserService','$location','localStorageService',
        function(UserService,$location,localStorageService){
        var self = this;
        self.backUrl = localStorageService.get('backUrl');
        self.prompt = localStorageService.get('prompt');
        if(self.backUrl == undefined){
            self.backUrl = 'index.html';
        }


        self.login = function(){
            console.log(self.user);
            UserService.login(self.user).then(function(){
                self.loginError = false;
                localStorageService.remove('prompt');
                localStorageService.remove('backUrl');
                window.location.href=self.backUrl;
            },function(errResponse){
                if(errResponse.status == 404){
                    self.loginErrorMsg = "连接服务器失败，请检查网络";
                }else if(errResponse.status == 401){
                    self.loginErrorMsg = "用户名或密码错误";
                }
                self.loginError = true;
            });
        }

    }]);
    app.factory('UserService',['$http',function($http){
        return {
            login : function(user){
                return $http.post('/api/session',user);
            }
        };
    }]);