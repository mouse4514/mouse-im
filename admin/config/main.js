require.config({
    paths:{
        //一些库文件
        'angular': '../js/angular-1.2.19/angular.min',
        'angularRoute': '../js/angular-1.2.19/angular-ui-router.min',
        'angularCookie': '../js/angular-1.2.19/angular-cookies.min',
        'angularSanitize':'../js/angular-1.2.19/angular-sanitize.min',
        'domReady': '../js/libs/domReady',
        //js文件
        'app': "app",
        'router': "uiRouter",
        'bootstrap': "bootstrap"
    },
    shim:{
        'angular':{
            exports:'angular'
        },
        'angularRoute':{
            deps:['angular'],
            exports: 'angularRoute'
        },
        'angularCookie':{
            deps:['angular'],
            exports: 'angularCookie'
        },
        'upload':{
            deps:['angular'],
            exports: 'upload'
        }
    },
    deps:['bootstrap'],
    urlArgs: "bust=" + (new Date()).getTime()  //防止读取缓存，调试用
});