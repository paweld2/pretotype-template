define(['angular', 'underscore'], function(angular, _) {
    var moduleName = 'controlModule';
    var module = angular.module(moduleName, []);

    var rootControllerName = 'rootController';

    module.controller(rootControllerName, ['$scope', function($scope) {

    }]);
    return {
        m: module,
        name: moduleName,
        rootController: rootControllerName
    };
});
