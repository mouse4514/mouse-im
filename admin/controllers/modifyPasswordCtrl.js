/**
*	联系人附件上传 控制器
*/

define(['angular','jquery','config'], function (angular,$,config) {
    return {
        controller:function ($cookieStore,$scope,$rootScope,Upload, $http,$routeParams,userModel) {
        	config.checkUser($cookieStore,$rootScope);
            var user = $cookieStore.get('users');

            $scope.save = function(){
                var _formData = {};
                _formData = $scope.formData;
                if(_formData==undefined){
                    config.showMessage('请输入原密码');
                    return ;
                }
                if(_formData.oldpassword==undefined){
                    config.showMessage('请输入原密码');
                    return ;
                }
                if(_formData.newpassword==undefined){
                    config.showMessage('请输入新密码');
                    return ;
                }
                if(_formData.newpassword!=_formData.repassword){
                    config.showMessage('两次密码输入不同');
                    return ;
                }
                _formData.uid = user.uid;
                userModel.modify(_formData);
            }

        }
    };
});