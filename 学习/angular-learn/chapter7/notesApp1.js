/**
 * Created with JetBrains WebStorm.
 * User: Administrator
 * Date: 16-12-8
 * Time: 下午6:40
 * To change this template use File | Settings | File Templates.
 */
angular.module('notesApp1',[])
    .factory('ItemService',[function() {
        var items = [
            {id:1, label: 'Item 0'},
            {id:2, label: 'Item 1'}
        ];
        return {
            list : function() {
                return items;
            },
            add : function(item) {
                items.push(item);
            }
        };
    }])
    .controller('ItemCtrl',['ItemService',function(ItemService) {
        var self = this;
        self.items = ItemService.list();
    }]);