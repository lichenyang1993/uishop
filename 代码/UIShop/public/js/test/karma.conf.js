module.exports = function(config){
    config.set({
        // 放置文件的根目录
        basePath : '',

        // 使用那些测试框架（jasmine/mocha/qunit)
        frameworks:['jasmine'],

        // 浏览器需要加载的文件列表或者文件匹配表达式
        files:[
            '../angular.js',
            'angular-mocks.js',
            '../angular-route.js',
            '../login.js',
            'loginSpec.js'
        ],

        // 需要排除的文件列表或者文件匹配正则表达式
        exclude:[],

        // Web服务器端口
        prot: 5000,

        // 日志等级
        // 合法值为：LOG_DISABLE || LOG_ERROR ||
        //          LOG_WARN || LOG_INFO || LOG_DEBUG
        logLevel: config.LOG_INFO,

        // 进行测试时是否允许随时监视文件变化
        autoWatch:true,

        // 启动一下浏览器，目前可以兼容
        // - Chrome
        // - ChromeCanary
        // - FireFox
        // - Opera
        // - Safari(仅限于Mac)
        // - PhantomJS
        // - IE(仅限于Windows)
        browsers: ['Chrome'],

        // 持续集成模式
        // 如果设置成true，则会启动浏览器，运行测试然后退出
        singleRun: false
    });
}