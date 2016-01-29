define(['angular','app'],function(angular,app){
	
	//pageNo按照现实中的习惯，从1开始计数。SQL语句中需做相应处理
	app.directive('nav', function ($cookieStore) {
        return {
            restrict : 'AE',
            replace : false,
            template : 
            '<li ng-repeat="ctrl in controllers" ng-class="{true: \'active\', false: \'\'}[ctrl.isActive]"><a  class="icon6" ng-click="selectNav(ctrl)" href="#{{ctrl.code}}">{{ctrl.name}}</a></li>',
            scope: {
            	 //page: '='
            }, 
            link: function (scope, element, attrs) {
            	var controllers = $cookieStore.get('controllers');
            	scope.controllers = controllers.user_controller;
            	scope.controllers[0].isActive = true;
            	scope.selectNav = function(item){
            		var index = scope.controllers.indexOf(item);
            		angular.forEach(scope.controllers,function(data){
            			data.isActive = false;
            		})
            		if(index > -1){
            			scope.controllers[index].isActive = true;
            		}
            	}
            	
            }
        };
})
	
})