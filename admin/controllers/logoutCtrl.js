define(['angular','jquery','config','angularCookie'], function (angular,$,config) {

    return {
        controller:function ($cookieStore,$scope, $http,$location) {
			$scope.init = function () {
				$cookieStore.remove("users");
				window.location.href = "/#/login";
			}
			$scope.init();
		}
    };
});