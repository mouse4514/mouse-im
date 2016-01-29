define(['angular','app'],function(angular,app){
	
	//子控制器
	app.directive('childctrl', function ($cookieStore) {
        return {
            restrict : 'AE',
            replace : false,
            template : 
            //'<dl class="bg1 shadow" ng-repeat="child in childcontrollers"><dd class="l"><p><a href="#{{child.code}}">{{child.name}}</a></p></dd></dl>',
            '<dl class="bg1 reset-top-nav" ng-repeat="child in childcontrollers"><a href="#{{child.code}}">{{child.name}}</a></dl>',
            scope: { //active 切换
            	 code: '@code'
            }, 
            link: function (scope, element, attrs) {
                var code = scope.code;
                var child_controller = $cookieStore.get('child_controller');
                var ctrls = child_controller.child_controller;
                scope.childcontrollers = ctrls[code];
            }
        };
})
	
})