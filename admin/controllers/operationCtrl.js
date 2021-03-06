/**
*	联系人管理 控制器
*/

define(['angular','jquery','config'], function (angular,$,config) {
    return {
        controller:function ($cookieStore,$scope,$rootScope, $http,operationModel,$location) {
        	config.checkUser($cookieStore,$rootScope);
			$scope.code = $location.path();
        	 /**
             参数：
             pageNo为页码
             total为记录的数量
             pageSize为每页显示数量
             */
        	$scope.pageSize = 10;
			$scope.page = 1;

			var params = {};
			params.page = $scope.page;
			params.pagesize = $scope.pageSize;
			operationModel.lists(params,function(params){
				$scope.lists = params.data.lists;
				$scope.total = params.data.total;
			});

			$scope.search = function(page){
        		 $scope.page = page;
				 var params = {};
				 params.page = page;
				 params.pagesize = $scope.pageSize;
				 params.where = $scope.where;
				 operationModel.lists(params,function(params){
					 $scope.lists = params.data.lists;
					 $scope.total = params.data.total;
				 });
        	 };
			

			$scope.where = {};
			//搜索条件设置
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