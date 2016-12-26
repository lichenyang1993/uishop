/**
 * Created with JetBrains WebStorm.
 * User: Administrator
 * Date: 16-12-8
 * Time: 下午6:31
 * To change this template use File | Settings | File Templates.
 */
describe('SimpleCtrl', function() {
    beforeEach(module('notesApp'));

    var ctrl, $loc;
    beforeEach(inject(function($controller,$location) {
        ctrl = $controller('SimpleCtrl');
        $loc = $location;
    }));

    it('should navigate away from the current page', function(){
        $loc.path('/here');
        ctrl.navigate();
        expect($loc.path()).toEqual('/some/where/else');
    });
});