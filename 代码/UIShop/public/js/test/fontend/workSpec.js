/**
 * Created with JetBrains WebStorm.
 * User: Administrator
 * Date: 16-12-15
 * Time: 下午8:54
 * To change this template use File | Settings | File Templates.
 */
describe('Font End Header Module Testcase',function() {
    beforeEach(module('uishop'));

    var workSearchCtrl, mockBackend, works, loc;

    beforeEach(inject(function($controller,$httpBackend,$location) {
        loc = $location;
        mockBackend = $httpBackend;
        workSearchCtrl = $controller('SearchWorkController');
        workSearchCtrl.keyword="蓝色";
        works = [
            {
                workId:1324,
                workName:"蓝色的官网",
                workPrice:1600.00,
                designer:{
                    id:10001,
                    name:"rrrmandy",
                    icon:"images/avatars/10.png",
                    balance:10000.00
                },
                workDesc:"为蓝色的产品设计的官网，希望大家喜欢\n\n换行测试",
                coverIcon:"images/product-details/1.jpg",
                images:[
                    "images/works/1.jpg",
                    "images/works/2.jpg",
                    "images/works/3.jpg"
                ],
                fileList:[
                    "upload/works/1.jpg",
                    "upload/works/2.jpg",
                    "upload/works/3.jpg"
                ],
                fileZip:"upload/works/zips/dce74e53-e35f-4b69-846b-409950c93800.zip"
            }
        ];
    }));

    it('search work success',function() {
        mockBackend.expectGET('/api/work?keyword=%E8%93%9D%E8%89%B2')
            .respond(200,works);
        workSearchCtrl.searchWork();
        mockBackend.flush();

        console.log(loc.path())
        expect(loc.path()).toEqual('/searchWorks');

    });



    afterEach(function() {
        // 确保$httpBackend所有预期行为都已完成
        mockBackend.verifyNoOutstandingExpectation();

        // 确保所有服务器请求都返回了相应（调用flush函数）
        mockBackend.verifyNoOutstandingRequest();
    });
});