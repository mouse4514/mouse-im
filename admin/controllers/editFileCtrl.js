/**
*	联系人附件编辑 控制器
*/

define(['angular','jquery','config'], function (angular,$,config) {
    return {
        controller:function ($cookieStore,$scope,$rootScope,Upload, $http,$routeParams,contactsModel) {
        	config.checkUser($cookieStore,$rootScope);
            //var user = $cookieStore.get('users');
            $scope.init = function(){
                var params = {};
                params.id = $routeParams.id;
                contactsModel.filedetail(params,function(params){
                    $scope.filename = params.filename;
                    $scope.tag = params.tag;
                });
            }
            $scope.init();
            /**
             * 保存附件编辑
             */
            $scope.save = function(){
                var params = {};
                params.id = $routeParams.id;
                params.tag = $scope.tag;
                contactsModel.savefiletag(params);
            }
        }
    };
});