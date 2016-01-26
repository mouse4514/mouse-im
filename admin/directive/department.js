define(['angular','app'],function(angular,app){
	
	app.directive('departmentlist', function ($cookieStore) {
        return {
            restrict : 'AE',
            replace : false,
            template : 
            '<ul ng-repeat="list in lists" class="active">'
            +'	<li>{{list.title}} <span>删除</span>'
            +'<ul ng-repeat="node in list.nodes" class="active"><li>{{node.title}} <span>删除</span></li></ul>'
            +'</li>'
            +'</ul>',
            scope: {
            	 lists: '='
            }, 
            link: function (scope, element, attrs) {
            }
        };
})
	
})