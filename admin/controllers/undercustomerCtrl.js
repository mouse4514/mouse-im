/**
*	下属
 *	客户管理 控制器
*/

define(['angular','jquery','config'], function (angular,$,config) {
    return {
        controller:function ($cookieStore,$scope,$rootScope, $http,systemModel,customerModel,$location) {
        	config.checkUser($cookieStore,$rootScope);
			$scope.code = $location.path();
			var $code = $location.path();
        	 /*
                          参数：
             pageNo为页码
             itemsCount为记录的数量
             pageSize为每页显示数量
             */
        	//$scope.page = 1;
        	$scope.pageSize = 10;
			var params = {};
			params.page = $scope.page;
			params.pagesize = $scope.pageSize;
			customerModel.under_customer_list(params,function(params){
				$scope.messages = params.customer_list;
				$scope.total = params.total;
				$scope.page = 1;
			});
			//列表查询
        	 $scope.search = function(page){
        		 $scope.page = page;
				 var params = {};
				 params.page = page;
				 params.pagesize = $scope.pageSize;
				 params.where = $scope.where;
				 customerModel.under_customer_list(params,function(params){
					 $scope.messages = params.customer_list;
					 $scope.total = params.total;
				 });
        	 };
			//删除客户
        	 $scope.deleteData = function(id){
				 customerModel.deletecustomer(id);
				 var params = {};
				 params.page = $scope.page;
				 params.pagesize = $scope.pageSize;
				 customerModel.under_customer_list(params,function(params){
					 $scope.messages = params.customer_list;
					 $scope.total = params.total;
				 });
        	 }
			//检索信息展示
			systemModel.types(function(params){
				$scope.types = params.types;
			});
			//搜索条件设置
			$scope.where = {};
			$scope.setWhere = function(value,type){
				$scope.page = 1;
				if(value){
					$scope.where[type] = value;
				}else{
					delete $scope.where[type];
				}
				$scope.search($scope.page);
			}
        }
    };
});