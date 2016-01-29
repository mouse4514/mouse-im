define(['angular','jquery','config'], function (angular,$,config) {

    return {
        controller:function ($scope) {
            $scope.visible = false;
            $scope.toggle = function () {
                $scope.visible = !$scope.visible;
            }
        }
    };
});