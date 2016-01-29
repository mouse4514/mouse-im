define(['angular','jquery','config'], function (angular,$,config) {

    return {
        controller:function ($cookieStore,$rootScope,$scope, $http,userModel) {
        	config.checkUser($cookieStore,$rootScope);
            var role_ids = [];
            userModel.userinfo(function(params){
                $scope.formData = params.userinfo;
                $scope.departments = params.departments;
                $scope.roles = params.roles;
                role_ids = params.role_ids;
                $scope.formData.role_ids = role_ids;
            });
            //会员权限多选
            $scope.updateChecked = function($event,controller_id){
                var checked = $event.target.checked;
                if(checked){
                    role_ids.push(controller_id);
                }else{
                    var index = role_ids.indexOf(controller_id);
                    if (index > -1) {
                        role_ids.splice(index, 1);
                    }
                }
                $scope.formData.role_ids = role_ids;
            }

            $scope.dosave = function(){
                var _formData =  $scope.formData;
                if(_formData === undefined){
                    config.showMessage('会员名称为空');
                    return ;
                }
                if(_formData.username === undefined){
                    config.showMessage('会员名称为空');
                    return ;
                }
                if(_formData.realname === undefined){
                    config.showMessage('真实姓名为空');
                    return ;
                }
                if(_formData.username === undefined){
                    config.showMessage('会员名为空');
                    return ;
                }
                if(_formData.department_id === undefined){
                    config.showMessage('部门为空');
                    return ;
                }
                if(_formData.role_ids === undefined){
                    config.showMessage('会员权限为空');
                    return ;
                }


                userModel.dosave(_formData);
            }

        }
    };
});