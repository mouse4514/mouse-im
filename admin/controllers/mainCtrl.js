define(['angular','jquery','config'], function (angular,$,config) {
    return {
        controller:function ($cookieStore,$scope, $http,$rootScope,defaultModel,userModel) {
        	config.checkUser($cookieStore,$rootScope);
			var user = $cookieStore.get('users');

        	defaultModel.init(function(params){
			 	$scope.info  = params.info;
			 });

        	$scope.reload = function(){
        		defaultModel.init(function(params){
    			 	$scope.info  = params.info;
    			 });
        	}
//console.log($cookieStore.get('user_controller'));
//        	$scope.clickUsername = function(){
//        		defaultModel.setAttr($scope.username)
//        	}
        	//var a = defaultModel.init();
//        	console.log(a.username);
//        	defaultModel.init().then(function(res){
//        	   // $scope.userInfo=res;
//        	  });
        	
        	$scope.clickUsername = function(){
        		//console.log(defaultModel.username);
        	}

			$scope.logout = function(){
				$cookieStore.remove('users');
				window.location.href = "#/login";
			}
        }
    };
});