/**
 *	责任人变更申请列表 控制器
 */

define(['angular','jquery','config'], function (angular,$,config) {
    return {
        controller:function ($cookieStore,$scope,$rootScope,$location,Upload, $http,$routeParams,changeapplyModel) {
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

            //信息初始化
            $scope.init = function(){
                var params = {};
                params.page = $scope.page;
                params.pagesize = $scope.pageSize;
                changeapplyModel.lists(params,function(params){
                    $scope.lists = params.lists;
                    $scope.total = params.total;
                });
            }
            $scope.init();

            $scope.search = function(page){
                $scope.page = page;
                var params = {};
                params.page = page;
                params.pagesize = $scope.pageSize;
                params.where = $scope.where;
                changeapplyModel.lists(params,function(params){
                    $scope.lists = params.lists;
                    $scope.total = params.total;
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

            $scope.audit = function(id,status){
                var params = {};
                params.status = status;
                params.apply_id = id;
                changeapplyModel.applychange(params);
                setTimeout(function(){
                    $scope.search($scope.page);
                },500);
            }

        }
    };
});