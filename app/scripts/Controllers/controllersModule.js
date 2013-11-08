/* Controllers */

define(['angular'],function(angular){
    var moduleName = 'controlModule';
    var module = angular.module(moduleName,[]);
    module.controller('MainCtrl',['$scope', function($scope) {
        console.log('main controller runnign');
        $scope.world = "World";
    }]);
    return {
        m : module,
        name :moduleName
    }
});
