/**
 * Created with JetBrains WebStorm.
 * User: Administrator
 * Date: 16-12-6
 * Time: 下午10:00
 * To change this template use File | Settings | File Templates.
 */
describe("Controller: ListCtrl", function() {
    // 在每次运行测试前都重新实例化一个模块
    beforeEach(module('notesApp'));

    var ctrl;

    // 每次单元测试前都实例化一个新的控制器
    beforeEach(inject(function($controller) {
        ctrl = $controller('ListCtrl');
    }));

    it('should have items available on load', function() {
        expect(ctrl.items).toEqual( [
            {id:1, label: 'First', done: false},
            {id:2, label: 'Second', done: false}
        ]);
    });

    it('should have highlight items based on state', function() {
       var item = {id:1, lable: "First",done : true};

        var actualClass = ctrl.getDoneClass(item);
        expect(actualClass.finished).toBeTruthy();
        expect(actualClass.unfinished).toBeFalsy();

        item.done=false;
        actualClass = ctrl.getDoneClass(item);
        expect(actualClass.unfinished).toBeTruthy();
        expect(actualClass.finished).toBeFalsy();
    });
});