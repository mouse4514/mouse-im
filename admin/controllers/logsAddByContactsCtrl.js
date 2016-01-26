/**
*	客户访问记录编辑 控制器
*/

define(['angular','jquery','config'], function (angular,$,config) {
    return {
        controller:function ($cookieStore,$scope,$rootScope, $http,$routeParams,contactsModel,customerModel) {
        	config.checkUser($cookieStore,$rootScope);

        	/**
        	 * 初始化
        	 */
			$scope.init = function(){
				var params = {};
				params.contacts_id = $routeParams.contacts_id;
				contactsModel.addlogsdetail(params,function(params){
					$scope.contacts_id = params.contacts_id;
					$scope.customer_id = params.customer_id;
					$scope.customer_name = params.customer_name;
					$scope.contacts_name = params.contacts_name;
					$scope.type = params.type;
				});
			}
			$scope.init();


			$scope.add = function(){
				if($scope.formData==undefined){
					config.showMessage('访问方式为空');
					return ;
				}
				if($scope.formData.type==undefined){
					config.showMessage('访问方式为空');
					return ;
				}
				if($("#visit_time").val()==''){
					config.showMessage('访问时间为空');
					return ;
				}
				var _formData = $scope.formData;
				_formData['contacts_id'] = $scope.contacts_id;
				_formData['customer_id'] = $scope.customer_id;
				_formData['visit_time'] = $("#visit_time").val();
				_formData['next_visit_time'] = $("#next_visit_time").val();

				customerModel.addlogs(_formData);
			}

        }
    };
});