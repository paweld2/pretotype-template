define([
        'angular'
    ],
    function(angular, template) {
        'use strict';
        var moduleName = 'protoJSModule';
        var module = angular.module(moduleName, []);

        module.directive('proP', [function() {
            var ddo = {
                restrict: 'EA',
                scope: false,
                controller: function($scope, $element, $attrs, $transclude) {
                    $scope.proP = true;
                    $scope.proData = {};
                    $scope.proEvents = {};
                    this.registerChildren = function(proC) {
                        proC.register = {
                            trigger: function() {
                                console.log('registering ' + proC.childSignals.a);
                            }
                        };
                    };
                }

            };
            return ddo;
        }]);
        module.directive('proC', [function() {
            var ddo = {
                require: '^proP',
                restrict: 'EA',
                scope: {
                    option: '@'
                },
                template: "<div><a ng-click='register.trigger()'>XXXXX</a></div>",
                controller: function($scope, $element, $attrs, $transclude) {
                    $scope.proC = true;
                    $scope.childSignals = {
                        a: 'a'
                    };
                },
                link: function(scope, element, attrs, proPCtrl) {
                    proPCtrl.registerChildren(scope);
                }

            };
            return ddo;
        }]);
        return {
            m: module,
            name: moduleName
        };
    });
