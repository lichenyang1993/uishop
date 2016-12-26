/**
 * Created with JetBrains WebStorm.
 * User: Administrator
 * Date: 16-12-8
 * Time: 下午6:47
 * To change this template use File | Settings | File Templates.
 */
describe('ItemCtrl with inline mock', function() {
    beforeEach(module('notesApp1'));

    var ctrl, mockService;

    beforeEach(module(function($provide) {
        mockService = {
            list: function() {
                return [{id:1,label:'Mock'}];
            }
        };
        $provide.value('ItemService',mockService);
    }));

    beforeEach(inject(function($controller) {
        ctrl = $controller('ItemCtrl');
    }));

    it('should load mocked out items', function() {
       expect(ctrl.items).toEqual([{id:1,label:'Mock'}]);
//        ctrl.add({id:2,label:'lbl2'});
//        expect(ctrl.items).toEqual([{id:1,label:'Mock'},{id:2,label:'lbl2'}]);
    });
})