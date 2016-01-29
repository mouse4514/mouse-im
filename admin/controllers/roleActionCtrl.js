define(['angular','jquery','config','angularCookie'], function (angular,$,config) {

    return {
        controller:function ($cookieStore,$scope,$rootScope, $http,roleModel) {
        	config.checkUser($cookieStore,$rootScope);
            $scope.formData = {};
            var action_id_arr = [];
            roleModel.action(function(params){
                $scope.controllers = params.controllers;
                action_id_arr = params.user_action_ids;
                $scope.formData.action_ids = action_id_arr;
            });
            $scope.updateChecked = function($event,action_id){
                var checked = $event.target.checked;
                if(checked){
                    action_id_arr.push(action_id);
                }else{
                    var index = action_id_arr.indexOf(action_id);
                    if (index > -1) {
                        action_id_arr.splice(index, 1);
                    }
                }
                $scope.formData.action_ids = action_id_arr;
            }
            $scope.dosave = function(){
                var _formData = $scope.formData;
                roleModel.addaction(_formData);
            }

        }
    };
});