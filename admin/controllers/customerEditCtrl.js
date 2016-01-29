/**
*	客户管理 新增客户 控制器
*/

define(['angular','jquery','config'], function (angular,$,config) {
    return {
        controller:function ($cookieStore,$scope,$rootScope, $http,$routeParams,Upload,customerModel,systemModel,wjtrserverModel) {
        	config.checkUser($cookieStore,$rootScope);

        	$scope.fromData = {};
        	$scope.selectZone = 0;
        	/**
        	 * 初始化
        	 */
        	$scope.init = function(){
        		 var params = {};
        		 params['id'] = $routeParams.id;
        		 customerModel.detail(params,function(data){
        			 $scope.fromData = data.detail;
        			 $scope.selectZone = data.detail.zone_upid;
        			 $scope.selectCity = data.detail.zone_id;
        		 })
        	}
			$scope.init();
			/**
			 * 常用类型
			 */
			systemModel.types(function(params){
				$scope.types = params.types;
			});
			/**
			 * 投融创客空间
			 */
			wjtrserverModel.makers({},function(params){
				$scope.makers = params.makers;
			})
	    	 /**
	    	  * 城市联动
	    	  */
			 setTimeout(function(){
				 systemModel.zone(function(params){
					 $scope.zoneTree = params.zoneTree;
					 angular.forEach($scope.zoneTree,function(n,i){
						 if(n.id==$scope.selectZone){
							 $scope.citysTree = n.children;
						 }
					 });
				 });
			 },500);
	    	 $scope.changeZone = function(zone_id){
	    		 $scope.selectZone = zone_id;
				 var index = parseInt(zone_id)-1;//偷懒下
				 $scope.citysTree = $scope.zoneTree[index].children;
	    	 }
	    	 $scope.changeCitys = function(zone_id){
	    		 $scope.fromData.zone_id = zone_id;
	    	 }

	    	 
	    	 /**
	    	  * 保存
	    	  */
	    	 $scope.save = function(){
				 var _fromData = $scope.fromData;

				 if(_fromData==undefined){
					 config.showMessage('客户全称为空');
					 return ;
				 }
				 if(_fromData.fullname==undefined){
					 config.showMessage('客户全称为空');
					 return ;
				 }
				 if(_fromData.abbreviation==undefined){
					 config.showMessage('客户简称为空');
					 return ;
				 }
				 if(_fromData.zone_id==undefined){
					 config.showMessage('所在城市为空');
					 return ;
				 }
				 if(_fromData.grade==undefined){
					 config.showMessage('客户分级为空');
					 return ;
				 }
				 if(_fromData.type==undefined){
					 config.showMessage('客户类型为空');
					 return ;
				 }
				 if(_fromData.customer_state==undefined){
					 config.showMessage('客户状态为空');
					 return ;
				 }
				 customerModel.editcustomer(_fromData);
	    	 }

        	 
        }
    };
});