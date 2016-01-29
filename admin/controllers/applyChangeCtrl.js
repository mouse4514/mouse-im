/**
*	责任人变更申请 控制器
*/

define(['angular','jquery','config'], function (angular,$,config) {
    return {
        controller:function ($cookieStore,$scope,$rootScope,Upload, $http,$routeParams,customerModel) {
        	config.checkUser($cookieStore,$rootScope);
            //信息初始化
            $scope.init = function(){
                var params = {};
                params.id = $routeParams.id;
                customerModel.userlist(params,function(params){
                    $scope.formData = {};
                    $scope.formData.user_lists = params.user_lists;
                    $scope.formData.uid = params.uid;
                });
            }
            $scope.init();

            $scope.change = function(){
                var params = {};
                params.id = $routeParams.id;
                params.uid = $scope.formData.uid; //申请变更的责任人UID
                customerModel.changeapply(params);
            }
        }
    };
});