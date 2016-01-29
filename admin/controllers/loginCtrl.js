define(['angular','config','angularCookie'], function (angular,config) {

    return {
        controller:function ($cookieStore,$scope, $http,$location) {
        	 var url = config.apiPath+'/login/login';
        	 $scope.processForm = function() {
        			var _formData = $scope.formData;
        			
        			if(_formData === undefined){
        				config.showMessage('账号为空');
        				return ;
        			}
        			if(_formData.username === undefined){
        				config.showMessage('账号为空');
        				return ;
        			}
        			if(_formData.password === undefined){
        				config.showMessage('密码为空');
        				return ;
        			}
        			var formData = $.param($scope.formData);
        			 $http({
        			        method  : 'POST',
        			        url     : url,
        			        data    : $.param($scope.formData),
        			        headers : { 'Content-Type': 'application/x-www-form-urlencoded' }
        			    }).success(function(data) {
        			        if(data.status){
        			        	$cookieStore.remove("users");
        			        	$cookieStore.put("users", {
        			        		uid: data.message.uid,
        			        		username: data.message.username,
									role:data.message.role,
        			        		ticket : data.message.ticket,
        			        		user_action:data.message.user_action
        			        	});
								$cookieStore.remove("controllers");
								$cookieStore.put("controllers", {
									user_controller:data.message.user_controller
								});
								$cookieStore.remove("child_controller");
								$cookieStore.put("child_controller", {
									child_controller:data.message.child_controller
								});

								window.location.href="/views/main.html#/main";

								//var users = $cookieStore.get('users');
								//console.log(users);
        			        }else{
        			        	config.showMessage(data.message);
                				return ;
        			        }
        			    });
        		}
        }
    };
});