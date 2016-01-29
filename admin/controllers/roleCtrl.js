define(['angular','jquery','config','angularCookie'], function (angular,$,config) {

    return {
        controller:function ($cookieStore,$scope,$rootScope, $http,roleModel) {
        	config.checkUser($cookieStore,$rootScope);
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
            /*
             参数：
             pageNo为页码
             itemsCount为记录的数量
             pageSize为每页显示数量
             */
            $scope.page = 1;
            $scope.pageSize = 10;
            var params = {};
            params.page = $scope.page;
            params.pagesize = $scope.pageSize;
            roleModel.role(params,function(params){
                $scope.roles = params.roles;
                $scope.total = params.total;
            });
            /**
             * 角色列表分页
             */
            $scope.search = function(page){
                $scope.page = page;
                var params = {};
                params.page = page;
                params.pagesize = $scope.pageSize;
                roleModel.role(params,function(params){
                    $scope.roles = params.roles;
                    $scope.total = params.total;
                });
            };
            /**
             * 删除角色
             */
            $scope.delete = function(id){
                roleModel.delete(id);
                setTimeout(function(){
                    var params = {};
                    params.page = $scope.page;
                    params.pagesize = $scope.pageSize;
                    roleModel.role(params,function(params){
                        $scope.roles = params.roles;
                        $scope.total = params.total;
                    });
                },500);
            }
        }
    };
});