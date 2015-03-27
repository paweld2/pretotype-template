define([
        'angular',
        'holderjs'
    ],
    function (angular, Holder) {
        'use strict';
        var moduleName = 'holderJSModule';
        var module = angular.module(moduleName, []);

        module.directive('holderJs', [function () {
            return {
                link: function (scope, element, attrs) {
                    Holder.run(element);
                }
            };
        }]);
        return {
            m: module,
            name: moduleName
        };
    });
