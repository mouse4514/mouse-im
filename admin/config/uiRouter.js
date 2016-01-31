define(['angular', 'require', 'app','routeMap','modelMap','angularRoute'],

    function (angular, require, app, routeMap,modelMap) {

        app.config(function ($stateProvider, $urlRouterProvider) {

            $urlRouterProvider.when("", "/login");

            $stateProvider
                .state("login", {
                    url: "/login",
                    templateUrl: "/views/public/login.html"
                })
                .state("PageTab.Page1", {
                    url:"/Page1",
                    templateUrl: "Page-1.html"
                })
                .state("PageTab.Page2", {
                    url:"/Page2",
                    templateUrl: "Page-2.html"
                })
                .state("PageTab.Page3", {
                    url:"/Page3",
                    templateUrl: "Page3.html"
                });
        });

        //app.config(['$routeProvider', '$controllerProvider','$provide',
        //    function($routeProvider, $controllerProvider,$provide) {
        //
        //        var defaultRoute = '/login';              //默认跳转到某个路由
        //        //注册model
        //        for (var mk in modelMap) {
        //            reqG(modelMap[mk].path,mk);
        //        }
        //        for (var key in routeMap) {
        //            $routeProvider.when(key, {
        //                templateUrl: routeMap[key].tpl,
        //                controller: routeMap[key].controller,
        //                resolve:{
        //                    keyName: requireModule(routeMap[key].path, routeMap[key].controller,routeMap[key].model)
        //                }
        //            });
        //        }
        //
        //        function requireModule(path, controller,models) {
        //            if(models){
        //                for (var k in models) {
        //                    req(models[k]);
        //                }
        //            }
        //            return function ($route, $q) {
        //                var deferred = $q.defer();
        //                require([path], function (ret) {
        //                    $controllerProvider.register(controller, ret.controller);
        //                    // $route.current.templateUrl = 'views/index2.html';
        //                    deferred.resolve();
        //                });
        //                return deferred.promise;
        //            }
        //        }
        //        function reqG(path,model){
        //            require([path], function (ret) {
        //                $provide.factory(model,ret.factory);
        //            });
        //        }
        //        function req(model){
        //            require(['../services/'+model], function (ret) {
        //                $provide.factory(model,ret.factory);
        //            });
        //        }
        //
        //        require(['/controllers/topCtrl.js'], function (ret) {
        //            $controllerProvider.register('topCtrl', ret.controller);
        //        });
        //        $routeProvider.otherwise({redirectTo: defaultRoute});
        //    }]);

        return app;
    });