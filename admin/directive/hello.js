define(['angular','app'],function(angular,app){
	
	app.directive('hello',function(){
        return {
            restrict : 'EA',
            template : '<div>hello</div>'
   };
})
	
})