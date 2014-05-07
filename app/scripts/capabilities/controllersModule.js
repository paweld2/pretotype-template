define(['angular', 'underscore', 'eelnss'], function (angular, _, lenses) {
    var moduleName = 'controlModule';
    var module = angular.module(moduleName, []);
    module.controller('MainCtrl', ['$scope', function ($scope) {
        console.log('main controller running');
        $scope.world = "World";
    }]);

    module.directive('mydirective', function () {
        return {
            restrict: "EA",
            template: "<strong>myAmazingDirective</strong>",
            replace: true
        };
    });
    module.directive('appVersion', ['version', function (version) {
        return function (scope, elm, attrs) {
            elm.text(version);
        };
    }]);


    module.filter('interpolate', ['version', function (version) {
        return function (text) {
            return String(text).replace(/\%VERSION\%/mg, version);
        };
    }]);


    module.factory('version', function () {
        return "0.1";
    });

    return {
        m: module,
        name: moduleName
    };
});
