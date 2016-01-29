define(['angular','jquery','config','angularCookie'], function (angular,$,config) {

    return {
        controller:function ($cookieStore,$scope,$rootScope, $http,roleModel) {
        	config.checkUser($cookieStore,$rootScope);
            roleModel.editinfo(function(params){
                $scope.role_info = params.role_info;
                $scope.role_type = params.role_type;
                $scope.roles = params.roles;
            });
            $scope.dosave = function(){
                var _formData = $scope.role_info;
                if(_formData === undefined){
                    config.showMessage('角色名称为空');
                    return ;
                }
                if(_formData.name === undefined){
                    config.showMessage('角色名称为空');
                    return ;
                }
                if(_formData.type === undefined){
                    config.showMessage('角色权限为空');
                    return ;
                }
                if(_formData.status === undefined){
                    config.showMessage('角色状态为空');
                    return ;
                }
                roleModel.save(_formData);
            }
        }
    };
});