define(['angular','jquery','config'], function (angular,$,config) {

    return {
        controller:function ($cookieStore,$rootScope,$scope, $http,userModel) {
        	config.checkUser($cookieStore,$rootScope);
            userModel.info(function(params){
                $scope.departments = params.departments;
                $scope.roles = params.roles;
            });
            $scope.formData = {};
            $scope.formData.sort=50;
            var role_id_arr = [];
            $scope.selected = [];
            $scope.formData.status = 1;
            $scope.updateSelection = function($event,role_id){
                var checked = $event.target.checked;
                if(checked){
                	role_id_arr.push(role_id);
                }else{
                	var index = role_id_arr.indexOf(role_id);
                    if (index > -1) {
                        role_id_arr.splice(index, 1);
                    }
                }
            	$scope.formData.role_ids = role_id_arr;
            }
            $scope.register = function(){
            	var _formData = $scope.formData;
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
                if(_formData.status === undefined){
                    config.showMessage('会员状态为空');
                    return ;
                }
                if(_formData.password === undefined){
                    config.showMessage('密码为空');
                    return ;
                }
                if(_formData.password!=_formData.repassword){
                    config.showMessage('两次输入密码不相同');
                    return ;
                }

                userModel.adduser(_formData,function(){
                    var departments = $scope.departments;
                    var roles = $scope.roles;
                    $scope.formData = {};
                    $scope.formData.sort=50;
                    $scope.formData.status = 1;
                    $scope.departments = departments;
                    $scope.roles = roles;
                });
            }

        }
    };
});