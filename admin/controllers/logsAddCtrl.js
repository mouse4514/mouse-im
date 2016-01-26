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
			$scope.init = function(){
				var params = {};
				params.customer_id = $routeParams.customer_id;
				customerModel.addlogsdetail(params,function(params){
					$scope.contacts_list = params.contacts_list;
					$scope.customer_name = params.name;
					$scope.type = params.type;
				});
			}
			$scope.init();

			$scope.add = function(){
				var _formData = $scope.formData;
				_formData['visit_time'] = $("#visit_time").val();
				_formData['next_visit_time'] = $("#next_visit_time").val();
				_formData['customer_id'] = $routeParams.customer_id;
				customerModel.addlogs(_formData,function(){
					$scope.formData = '';
				});
			}

        }
    };
});