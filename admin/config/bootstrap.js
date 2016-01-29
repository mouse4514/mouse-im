define(['require',
        'angular',
        'angularRoute',
        'app',
        'router',
        'routeMap',
        'modelMap',
      //  'upload',
        '../directive/pagination',
        '../directive/childctrl',
        '../directive/nav',
        '../directive/department'
       ],function(require,angular){
            'use strict';
            require(['domReady!'],function(document){
                angular.bootstrap(document,['webapp']);
            });
        });