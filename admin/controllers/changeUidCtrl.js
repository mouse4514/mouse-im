/**
*	客户访问记录编辑 控制器
*/

define(['angular','jquery','config'], function (angular,$,config) {
    return {
        controller:function ($cookieStore,$scope,$rootScope, $http,$routeParams,customerModel) {
        	config.checkUser($cookieStore,$rootScope);
			//信息初始化
			$scope.init = function(){
				var params = {};
				params.id = $routeParams.id;
				customerModel.userlist(params,function(params){
					$scope.formData = {};
					$scope.formData.user_lists = params.user_lists;
					$scope.formData.uid = params.uid;
				});
			}
			$scope.init();

			$scope.save = function(){
				var params = {};
				params.id = $routeParams.id;
				params.uid = $scope.formData.uid;
				customerModel.changeuser(params);
			}


        }
    };
});