/**
 * Created with JetBrains WebStorm.
 * User: Administrator
 * Date: 16-12-6
 * Time: 下午9:56
 * To change this template use File | Settings | File Templates.
 */
angular.module('notesApp',[])
    .controller('ListCtrl', [function() {
        var self = this;
        self.items = [
            {id:1, label: 'First', done: false},
            {id:2, label: 'Second', done: false}
        ];

        self.getDoneClass = function(item) {
            return {
                finished : item.done,
                unfinished: !item.done
            };
        };
    }]);