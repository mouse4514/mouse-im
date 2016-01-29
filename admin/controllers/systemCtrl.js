define(['angular','jquery','config','angularCookie'], function (angular,$,config) {

    return {
        controller:function ($cookieStore,$scope,$rootScope, $http,systemModel) {
        	config.checkUser($cookieStore,$rootScope);
//            systemModel.role(function(params){
//                $scope.roles = params.roles;
//            });
        }
    };
});