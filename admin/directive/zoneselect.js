define(['angular','app'],function(angular,app){
	
	//子控制器
	app.directive('zoneselect', function () {
        return {
            restrict : 'AE',
            replace : false,
            template : 
            '<select id="city"><option value="">省份</option><option ng-repeat="zone in zonetree"  value="{{zone.id}}">{{zone.name}}</option> </select><select name="zone_id" id="zone"><option value="{{family.0.id}}"></option>{{family.0.name}}</select>',
            scope: {
            	 zonetree: '@zonetree',
                 family: '@family',
            }, 
            link: function (scope, element, attrs) {
            }
        };
})
	
})