/**
*	客户管理 新增客户 控制器
*/

define(['angular','jquery','config'], function (angular,$,config) {
    return {
        controller:function ($cookieStore,$scope,$rootScope, $http,Upload,customerModel,systemModel,wjtrserverModel) {
        	config.checkUser($cookieStore,$rootScope);

        	$scope.fromData = {};
	    	 /**
	    	  * 城市联动
	    	  */
	    	 systemModel.zone(function(params){
				$scope.zoneTree = params.zoneTree;
			});
	    	 $scope.changeZone = function(zone_id){
	    		 $scope.selectZone = zone_id;
				 var index = parseInt(zone_id)-1;//偷懒下
	    		 $scope.citysTree = $scope.zoneTree[index].children;
	    	 }
	    	 $scope.changeCitys = function(zone_id){
	    		 $scope.fromData.zone_id = zone_id;
	    	 }
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
				 if(_fromData.state==undefined){
					 config.showMessage('客户状态为空');
					 return ;
				 }

				 customerModel.addcustomer(_fromData);
				 var types = $scope.fromData.types;
				 $scope.fromData = {};
				 $scope.fromData.types = types;
	    	 }
        	 /**
        	  * 上传
        	  */
        	 $scope.upload = function (file) {
        		 var url = config.apiPath+'/upload/upload';
        	        Upload.upload({
        	            url: url,
        	            data: {
        	            	myfile: file, 
        	            	'username': $scope.username
        	            	}
        	        }).then(function (resp) {
        	            console.log(resp);
        	        }, function (resp) {
        	            console.log('Error status: ' + resp.status);
        	        }, function (evt) {
        	        	//进度
        	            var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
        	            console.log('progress: ' + progressPercentage + '% ');
        	        });
          };
          
        }
    };
});