/**
*	联系人管理 控制器
*/

define(['angular','jquery','config'], function (angular,$,config) {
    return {
        controller:function ($cookieStore,$scope,$rootScope, $http,contactsModel,$location,systemModel,$routeParams) {
        	config.checkUser($cookieStore,$rootScope);
			$scope.code = $location.path();
			$scope.fromData = {};
			$scope.fromData.sex = -1;
			/*console.log($scope.fromData.customer_id);*/
			 /**
	    	  * 常用类型
	    	  */
	    	 systemModel.types(function(params){
					$scope.types = params.types;
				});
	    	 /**
	    	  * 客户 下拉框
	    	  */
	    	 systemModel.selectedlists(function(params){
				 $scope.fromData.customer_id = parseInt($routeParams.id);
				 $scope.selectedlists = params.lists;
				});
	    	 /**
	    	  * 新增联系人
	    	  */
	    	 $scope.save = function(){
	    		 var birthday = $("input[name='birthday']").val();
	    		 $scope.fromData.birthday = birthday;
	    		 var _fromData = $scope.fromData;
	    	
	    		 if(_fromData.customer_id === undefined || !_fromData.customer_id){
	    			 config.showMessage("客户不能为空");
	    			 return false;
	    		 }
	    		 if(_fromData.realname === undefined){
	    			 config.showMessage("姓名不能为空");
	    			 return false;
	    		 }
	    		 if(_fromData.phone === undefined){
	    			 config.showMessage("手机不能为空");
	    			 return false;
	    		 }
	    		 contactsModel.add($scope.fromData);
	    	 }

	    	 

        }
    };
});