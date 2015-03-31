define([
        'angular'
    ],
    function(angular) {
        'use strict';
        var moduleName = 'focusOnDirectiveModule';
        var module = angular.module(moduleName, []);
        module.directive('focusOn', function() {
            return function(scope, elem, attr) {
                scope.$on('focusOn', function(e, name) {
                    if (name === attr.focusOn) {
                        elem[0].focus();
                    }
                });
            };
        });
        return {
            m: module,
            name: moduleName
        };
    });
