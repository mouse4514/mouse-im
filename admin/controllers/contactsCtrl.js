/**
*	联系人管理 控制器
*/

define(['angular','jquery','config'], function (angular,$,config) {
    return {
        controller:function ($cookieStore,$scope,$rootScope, Upload,$http,contactsModel,$location,systemModel) {
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
			contactsModel.lists(params,function(params){
				$scope.lists = params.data.lists;
				$scope.total = params.data.total;
			});

			$scope.search = function(page){
        		 $scope.page = page;
				 var params = {};
				 params.page = page;
				 params.pagesize = $scope.pageSize;
				 params.where = $scope.where;
				 contactsModel.lists(params,function(params){
					 $scope.lists = params.data.lists;
					 $scope.total = params.data.total;
				 });
        	 };
			/**
			 * 删除联系人
			 */
			$scope.del = function(id){
				contactsModel.del(id);
				var params = {};
				params.page =  $scope.page;
				params.pagesize = $scope.pageSize;
				params.where = $scope.where;
				contactsModel.lists(params,function(params){
					$scope.total = params.data.total;
					if(params.data.lists.length){
						$scope.lists = params.data.lists;
					}else {
						$scope.search($scope.page - 1);
					}
				});
			}

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

			/**
			 * 常用类型
			 */
			systemModel.types(function(params){
				$scope.types = params.types;
			});

			$scope.selected = {};
            var checked_id_arr = [];
            /**
             * 全选 反选
             */
            $scope.selectAll = function($event){
            	var checked = $event.target.checked;
            	angular.forEach($scope.lists,function(item,index){
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
                console.log(checked_id_arr);
            	$scope.selected.ids = checked_id_arr;
            }

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
             * 导出exl
             */
			$scope.exportExl = config.apiPath+'/contacts/exportexl?uid='+user.uid;
			/**
			 * 导出联系人Exl
			 */
			$scope.getExlFormat ='/images/contactsFormat.xls';
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
						contactsModel.uploadexcel(file_info,function(){
							var params = {};
							params.page = $scope.page;
							params.pagesize = $scope.pageSize;
							params.where = $scope.where;
							contactsModel.lists(params,function(params){
								$scope.lists = params.data.lists;
								$scope.total = params.data.total;
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