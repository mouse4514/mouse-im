define(['angular','jquery','config','angularCookie'], function (angular,$,config) {

    return {
        controller:function ($cookieStore,$scope,$rootScope, $http,roleModel) {
        	config.checkUser($cookieStore,$rootScope);
            roleModel.addinfo(function(params){
                $scope.role_type = params.role_type;
                $scope.roles = params.roles;
            });
            $scope.formData = {};
            $scope.formData.sort = 50;
            $scope.addrole = function(){
                var _formData = $scope.formData;

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
                roleModel.add(_formData);
            }
        }
    };
});