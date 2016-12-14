/**
 * Created with JetBrains WebStorm.
 * User: Administrator
 * Date: 16-12-13
 * Time: 下午8:55
 * To change this template use File | Settings | File Templates.
 */
describe('Login Module Testcase',function() {
    beforeEach(module('uishop-login'));

    var loginCtrl, mockBackend, user;

    beforeEach(inject(function($controller,$httpBackend) {
        mockBackend = $httpBackend;
        loginCtrl = $controller('LoginController');
        user = {username:'user',password:'123456',userType:'designer'};
    }));

    it('should login success',function() {
        mockBackend.expectPOST('/api/session')
            .respond(200,{msg:'登录成功'})
        loginCtrl.login(user);

        mockBackend.flush();
        expect(loginCtrl.loginError).toEqual(false);
    });

    it('server not reachable',function() {
        mockBackend.expectPOST('/api/session')
            .respond(404,{});
        loginCtrl.login(user);
        mockBackend.flush();
        expect(loginCtrl.loginError).toEqual(true);
        expect(loginCtrl.loginErrorMsg).toEqual("连接服务器失败，请检查网络");
    });

    it('should login fail',function() {
        mockBackend.expectPOST('/api/session')
            .respond(401,{msg:'用户名或密码错误'});
        loginCtrl.login(user);
        mockBackend.flush();
        expect(loginCtrl.loginError).toEqual(true);
        expect(loginCtrl.loginErrorMsg).toEqual("用户名或密码错误");
    });

    afterEach(function() {
        // 确保$httpBackend所有预期行为都已完成
        mockBackend.verifyNoOutstandingExpectation();

        // 确保所有服务器请求都返回了相应（调用flush函数）
        mockBackend.verifyNoOutstandingRequest();
    });
})