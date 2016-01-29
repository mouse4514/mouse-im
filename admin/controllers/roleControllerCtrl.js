define(['angular','jquery','config','angularCookie'], function (angular,$,config) {

    return {
        controller:function ($cookieStore,$scope,$rootScope, $http,roleModel) {
        	
        	config.checkUser($cookieStore,$rootScope);
        	  $scope.formData = {};
              var controller_id_arr = [];
            roleModel.controller(function(params){
                $scope.controllers = params.controllers.lists;
                controller_id_arr= params.controllers.userlists;
                $scope.formData.controller_ids = controller_id_arr;
            });
            $scope.updateChecked = function($event,controller_id){
                var checked = $event.target.checked;
                if(checked){
                    controller_id_arr.push(controller_id);
                }else{
                    var index = controller_id_arr.indexOf(controller_id);
                    if (index > -1) {
                        controller_id_arr.splice(index, 1);
                    }
                }
                $scope.formData.controller_ids = controller_id_arr;
            }
            $scope.dosave = function(){
                var _formData = $scope.formData;
                var params = {};
                params.controller_id_arr = _formData.controller_ids;
                roleModel.addcontroller(params);
            }


        }
    };
});