define(['angular','jquery','config'], function (angular,$,config) {

    return {
        controller:function ($cookieStore,$scope,$rootScope, $http,userModel,$location) {
        	config.checkUser($cookieStore,$rootScope);
            $scope.code = $location.path();
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
            $scope.pageSize = 10;
            var params = {};
            params.page = $scope.page;
            params.pagesize = $scope.pageSize;
            userModel.user_lists(params,function(params){
                $scope.page = 1;
                $scope.total = params.total;
                $scope.user_lists = params.user_lists;
            });
            $scope.where = [];
            $scope.search = function(page){
                $scope.page = page;
                var params = {};
                params.page = $scope.page;
                params.pagesize = $scope.pageSize;
                params.where = $scope.where;
                userModel.user_lists(params,function(params){
                    $scope.total = params.total;
                    $scope.user_lists = params.user_lists;
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


            //删除会员
            $scope.delete = function(id){
                userModel.deleteuser(id);
                setTimeout(function(){
                    var params = {};
                    params.page = $scope.page;
                    params.pagesize = $scope.pageSize;
                    userModel.user_lists(params,function(params){
                        $scope.total = params.total;
                        if(params.user_lists.length){
                            $scope.user_lists = params.user_lists;
                        }else {
                            $scope.search($scope.page-1);
                        }
                    });
                },500);
            }
        }
    };
});