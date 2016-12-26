/**
 * Created with JetBrains WebStorm.
 * User: Administrator
 * Date: 16-12-8
 * Time: 下午6:27
 * To change this template use File | Settings | File Templates.
 */
angular.module('notesApp',[])
    .controller('SimpleCtrl',['$location', function($location) {
        var self = this;
        self.navigate = function() {
            $location.path('/some/where/else');
        };
    }]);