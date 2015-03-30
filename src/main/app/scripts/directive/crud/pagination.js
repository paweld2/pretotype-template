define([
        'angular',
        "text!directive/crud/pagination.html"
    ],
    function(angular, template) {
        'use strict';
        var moduleName = 'crudPaginationJSModule';
        var module = angular.module(moduleName, []);

        module.directive('niPagination', [function() {
            var ddo = {
                template: template,
                restrict: 'EA',
                scope: false,
                controller: function($scope, $element, $attrs, $transclude) {
                        $scope.showNext = true;
                        $scope.showPrevious = true;

                    }
                    //                compile: function compile(tElement, tAttrs, transclude) {
                    //                    return {
                    //                        pre: function preLink(scope, iElement, iAttrs, controller) {
                    //                        },
                    //                        post: function postLink(scope, iElement, iAttrs, controller) {
                    //                        }
                    //                    }
                    //                }

            };
            return ddo;
        }]);
        return {
            m: module,
            name: moduleName
        };
    });
