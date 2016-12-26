/**
 * Created with JetBrains WebStorm.
 * User: Administrator
 * Date: 16-12-7
 * Time: 下午5:50
 * To change this template use File | Settings | File Templates.
 */

angular.module('notesApp',[])
    .controller('MainCtrl',[function() {
        var self = this;
        self.tab="first";
        self.open = function(tab){
            self.tab = tab;
        }
    }])
    .controller('SubCtrl', [function() {
        var self = this;
        self.list = [
            {id:1, label:'Item 0'},
            {id:2, label:'Item 1'}
        ];
        self.add = function() {
            self.list.push({
                id: self.list.length + 1,
                label: 'Item ' + self.list.length
            });
        };
    }]);