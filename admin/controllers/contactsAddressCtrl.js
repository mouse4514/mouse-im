/**
*	联系人附件上传 控制器
*/

define(['angular','jquery','config'], function (angular,$,config) {
    return {
        controller:function ($cookieStore,$scope,$rootScope,Upload, $http,$routeParams,contactsModel) {
        	config.checkUser($cookieStore,$rootScope);
            var user = $cookieStore.get('users');

            $scope.init = function(){
                /**
                 参数：
                 pageNo为页码
                 total为记录的数量
                 pageSize为每页显示数量
                 */
                var params = {};
                $scope.pageSize = 10;
                $scope.page = 1;
                params.page = $scope.page;
                params.pagesize = $scope.pageSize;
                params.id = $routeParams.id;
                contactsModel.addresslist(params,function(params){
                    $scope.lists = params.lists;
                    $scope.contacts_name = params.contacts_name;
                    $scope.contacts_id = params.contacts_id;
                    $scope.total = params.total;
                    $scope.uid = params.uid;
                });
                $scope.authority();
            }

            /**
             * 详情页权限控制
             */
            $scope.authority = function(){
                $scope.isAdministrator = -1;
                angular.forEach(user.role,function(n,i){
                    if($.inArray(n.type,['System','Normal'])==1){
                        $scope.isAdministrator = 1;
                    }
                });
                $scope.actionShow = ($scope.isAdministrator==1)||(user.uid==$scope.uid);
            }
            $scope.init();

            $scope.delete = function(id){
                contactsModel.addressdelete(id);
                setTimeout(function(){
                    var params = {};
                    params.page = $scope.page;
                    params.pagesize = $scope.pageSize;
                    params.id = $routeParams.id;
                    contactsModel.addresslist(params,function(params){
                        $scope.lists = params.lists;
                        $scope.contacts_name = params.contacts_name;
                        $scope.contacts_id = params.contacts_id;
                        $scope.total = params.total;
                    });
                },500);
            }

        }
    };
});