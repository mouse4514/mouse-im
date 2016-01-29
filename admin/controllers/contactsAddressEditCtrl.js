/**
*	联系人附件上传 控制器
*/

define(['angular','jquery','config'], function (angular,$,config) {
    return {
        controller:function ($cookieStore,$scope,$rootScope,Upload, $http,$routeParams,contactsModel) {
        	config.checkUser($cookieStore,$rootScope);

            $scope.init = function(){
                var params = {};
                params.id = $routeParams.id;
                contactsModel.addressinfo(params,function(params){
                    $scope.formData = params.formData;
                });
            }
            $scope.init();

            /**
             * 保存编辑
             */
            $scope.save = function(){
                var _formData = $scope.formData;
                if(_formData==undefined){
                    config.showMessage('电话为空');
                }
                if(_formData.tel==undefined){
                    config.showMessage('电话为空');
                }
                if(_formData.address==undefined){
                    config.showMessage('详细地址为空');
                }
                if(_formData.id==undefined){
                    _formData.contacts_id = $routeParams.id;
                    contactsModel.addaddress(_formData);
                }else{
                    contactsModel.saveaddress(_formData);
                }
            }

        }
    };
});