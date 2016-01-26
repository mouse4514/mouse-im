/**
*	客户访问记录编辑 控制器
*/

define(['angular','jquery','config'], function (angular,$,config) {
    return {
        controller:function ($cookieStore,$scope,$rootScope, $http,$routeParams,customerModel) {
        	config.checkUser($cookieStore,$rootScope);

        	/**
        	 * 初始化
        	 */
			var params = {};
			params.id = $routeParams.id;
			customerModel.logdetail(params,function(params){
				$scope.info = params.info;
				$scope.formData = params.detail;
			});
			/**
			 * 保存信息
			 */
			$scope.save = function(){
				var _formData = $scope.formData;
				if($scope.formData==undefined){
					config.showMessage('联系人为空');
					return ;
				}
				if($scope.formData.contacts_id==undefined){
					config.showMessage('联系人为空');
					return ;
				}
				if($scope.formData.visit_time==undefined){
					config.showMessage('访问时间为空');
					return ;
				}
				_formData['id'] = $routeParams.id;
				_formData['visit_time'] = $("#visit_time").val();
				_formData['next_visit_time'] = $("#next_visit_time").val();
				customerModel.logsave(_formData);
			}


        }
    };
});