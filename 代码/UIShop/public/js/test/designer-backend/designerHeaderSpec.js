/**
 * Created with JetBrains WebStorm.
 * User: Administrator
 * Date: 16-12-14
 * Time: 下午8:40
 * To change this template use File | Settings | File Templates.
 */
describe('Designer Backend Header Module Testcase',function() {
    beforeEach(module('ui-designer-backend'));

    var headerCtrl, mockBackend, user;

    beforeEach(inject(function($controller,$httpBackend) {
        mockBackend = $httpBackend;
        headerCtrl = $controller('DesignerHeaderController');

    }));

    it('designer logined',function() {
        user = {username:'张三',userType:'designer',userId:'132564'};

        mockBackend.expectGET('/api/session')
            .respond(200,user);
//        headerCtrl.getLoginUser();

        mockBackend.flush();
        expect(headerCtrl.user.designerLogin).toEqual(true);
        expect(headerCtrl.user.designerName).toEqual('张三');
    });

    it('no one logined',function() {
        user = {};

        mockBackend.expectGET('/api/session')
            .respond(403,user);
//        headerCtrl.getLoginUser();

        mockBackend.flush();
        expect(headerCtrl.user.designerLogin).toEqual(false);
        expect(headerCtrl.user.designerName).toEqual('');
    });

    it('log out',function() {
        mockBackend.expectGET('/api/session')
            .respond(403,{});
        user = {msg:'您已退出登录'};

        mockBackend.expectDELETE('/api/session')
            .respond(200,user)
        headerCtrl.logout();

        mockBackend.flush();
        expect(headerCtrl.user.designerLogin).toEqual(false);
        expect(headerCtrl.user.designerName).toEqual('');
    });


    afterEach(function() {
        // 确保$httpBackend所有预期行为都已完成
        mockBackend.verifyNoOutstandingExpectation();

        // 确保所有服务器请求都返回了相应（调用flush函数）
        mockBackend.verifyNoOutstandingRequest();
    });
})