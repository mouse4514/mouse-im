define(['angular','jquery','config','angularCookie'], function (angular,$,config) {

    return {
        controller:function ($cookieStore,$scope,$rootScope, $http,departmentModel) {
        	config.checkUser($cookieStore,$rootScope);
        	$scope.pid = 0;
        	$scope.title = '添加部门';
        	$scope.visible = true;
        	//初始化未分配部门用户
        	departmentModel.getUserNoDepart(function(data){
    			$scope.noDepUserLists = data.lists;
    		});
        	//初始化部门树
        	departmentModel.lists(function(params){
        		$scope.lists = params.lists;
        	});

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
        	 * 切换到添加部门状态
        	 */
        	$scope.optAdd = function(id,name){
        		$scope.pid = id;
        		$scope.title = "添加部门到"+name;
        		departmentModel.getDepartUser({id:id},function(data){
        			$scope.userLists = data.lists;
        		});
        		$scope.visible = true;
        	}
        	/**
        	 * 添加部门
        	 */
        	$scope.add = function(){
        		var params = {};
        		params['pid'] = $scope.pid;
        		params['name'] = $scope.depart_name;
        		if(params['name'] === undefined || !params['name']){
    				config.showMessage('部门名称不能为空');
    				return ;
    			}
        		departmentModel.add(params,function(data){
            		$scope.lists = data.lists;
            	});
        		$scope.visible = true;
        	}
        	/**
        	 * 切换到修改部门名称状态
        	 */
        	$scope.editName = function(id,name){
        		$scope.pid = id;
        		$scope.depart_name = name;
        		$scope.title = "修改部门名称";
        		$scope.visible = false;
        		var params = {};
        		params['id'] = id;
        		departmentModel.getDepartUser(params,function(data){
        			$scope.userLists = data.lists;
        		});
        	}
        	/**
        	 * 修改部门名称
        	 */
        	$scope.edit = function(){
        		var params = {};
        		params['id'] = $scope.pid;
        		params['name'] = $scope.depart_name;
        		if(params['name'] === undefined || !params['name']){
    				config.showMessage('部门名称不能为空');
    				return ;
    			}
        		departmentModel.edit(params,function(data){
            		$scope.lists = data.lists;
            	});
        	}
        	/**
        	 * 删除部门
        	 */
        	$scope.del = function(id){
        		var params = {};
        		params['id'] = id;
        		departmentModel.del(params,function(data){
            		$scope.lists = data.lists;
            	});
        	
        	}
        	/**
        	 * 部门加成员
        	 * id 部门id
        	 */
        	$scope.userAdd = function(){
        		var params = {};
        		var id = $scope.pid;
        		var uid = $scope.selectUid;
        		if(id == 0){
        			config.showMessage('请选择部门');
    				return ;
        		}
        		if(uid === undefined || !uid){
        			config.showMessage('请选择用户');
    				return ;
        		}
        		params['id'] = id;
        		params['dep_uid'] = uid;
        		departmentModel.addDepartUser(params,function(data){
            		$scope.userLists = data.lists;
            	 	//初始化未分配部门用户
                	departmentModel.getUserNoDepart(function(data){
            			$scope.noDepUserLists = data.lists;
            		});
            	});
        	}
        	/**
        	 * 删除部门成员
        	 */
        	$scope.delDepUser = function(uid){
        		var params = {};
        		params['dep_uid'] = uid;
        		params['id'] = $scope.pid;
        		departmentModel.delDepartUser(params,function(data){
        			$scope.userLists = data.lists;
        		 	//初始化未分配部门用户
                	departmentModel.getUserNoDepart(function(data){
            			$scope.noDepUserLists = data.lists;
            		});
        		})
        	}
        	
        }
    };
});