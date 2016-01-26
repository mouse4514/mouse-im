/**
*	客户管理 控制器
*/

define(['angular','jquery','config'], function (angular,$,config) {
    return {
        controller:function ($cookieStore,$scope,$rootScope,$routeParams, Upload,$http,systemModel,customerModel,$location) {
        	config.checkUser($cookieStore,$rootScope);
			$scope.code = $location.path();
			var $code = $location.path();

			/**
			 * 动作权限控制
			 */
			var user = $cookieStore.get('users');
			var action_codes = [];

			angular.forEach(user.user_action,function(actions,i){
				angular.forEach(actions,function(n,i){
					action_codes.push(n.code);
				});
			});

			$scope.show = function(content){
				if($.inArray(content,action_codes)==-1){
					return false;
				}else{
					return true;
				}
			}
			/**
			 * 导出客户
			 * @type {string}
             */
			$scope.getExcel = config.apiPath+'/customer/exportexl?uid='+user.uid;
			/**
			 * 导出客户Excel表格式
			 * @type {string}
			 */
			$scope.getExlFormat = '/images/customerFormat.xls';
        	 /*
                          参数：
             pageNo为页码
             itemsCount为记录的数量
             pageSize为每页显示数量
             */
        	//$scope.page = 1;
			var type = $routeParams.type;//跟进的客户
        	$scope.pageSize = 10;
			$scope.where = {};
			var params = {};
			params.page = $scope.page;
			params.pagesize = $scope.pageSize;
			params.where = '';
			if(type == 'hasvisit'){
				$scope.where.hastype = type;
				params.where = {'hastype':type};
			}
			customerModel.customer_list(params,function(params){
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
				 customerModel.customer_list(params,function(params){
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
				 customerModel.customer_list(params,function(params){
					 $scope.total = params.total;
					 if(params.customer_list.length){
						 $scope.messages = params.customer_list;
					 }else{
						 $scope.search($scope.page - 1);
					 }

				 });
        	 }
			//检索信息展示
			systemModel.types(function(params){
				$scope.types = params.types;
			});
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

			$scope.selected = {};
			var checked_id_arr = [];
			/**
			 * 全选 反选
			 */
			$scope.selectAll = function($event){
				var checked = $event.target.checked;
				angular.forEach($scope.messages,function(item,index){
					item.checked = checked;
					if(checked){
						checked_id_arr.push(item.id);
					}else{
						var index = checked_id_arr.indexOf(item.id);
						if (index > -1) {
							checked_id_arr.splice(index, 1);
						}
					}
				});
				$scope.selected.ids = checked_id_arr;
			}
			/**
			 * 单个选中 取消
			 */
			$scope.updateSelection = function($event,id){
				var checked = $event.target.checked;
				if(checked){
					checked_id_arr.push(id);
				}else{
					var index = checked_id_arr.indexOf(id);
					if (index > -1) {
						checked_id_arr.splice(index, 1);
					}
				}
				$scope.selected.ids = checked_id_arr;
			}

			/**
			 * 导入Excel
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
					if(resp.status==200){
						var file_info = {};
						file_info = resp.data;
						customerModel.uploadexcel(file_info,function(){
							var params = {};
							params.page = $scope.page;
							params.pagesize = $scope.pageSize;
							params.where = $scope.where;
							customerModel.customer_list(params,function(params){
								$scope.messages = params.customer_list;
								$scope.total = params.total;
							});
						});
					}
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