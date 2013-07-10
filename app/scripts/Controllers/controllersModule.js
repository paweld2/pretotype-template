/* Controllers */

define(['angular'],function(angular){
    var moduleName = 'controlModule';
    var module = angular.module(moduleName,[]);
    module.controller('MainCtrl',['$scope', function($scope) {
        console.log('main controller runnign');
        $scope.world = "World";
    }]);
    module.controller('ConfigCtrl',['$scope', function($scope) {
        $scope.configuration = [
            {"name":"test","value":"test value"},
            {"name":"test2","value":"test value"},
            {"name":"test3","value":"test value"},
            {"name":"test4","value":"test value"},
            {"name":"test5","value":"test value"}
        ];
    }]);
    return {
        m : module,
        name :moduleName
    }
});
