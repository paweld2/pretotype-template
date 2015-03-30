define([
        'angular',
        "text!directive/svg/svgCircle.html"
    ],
    function(angular, template) {
        'use strict';
        var moduleName = 'niSvgCircleModule';
        var module = angular.module(moduleName, []);

        module.directive('svgCircle', function() {
            return {
                restrict: 'E',
                scope: {
                    size: "@",
                    stroke: "@",
                    fill: "@"
                },
                replace: true,
                template: template,
                link: function(scope, element, attr) {
                    var calculateValues = function(size) {
                        var canvasSize = size * 2.5;

                        scope.values = {
                            canvas: canvasSize,
                            radius: size,
                            center: canvasSize / 2
                        };
                    };

                    var size = parseInt(attr.size, 0);

                    attr.$observe('size', function(newSize) {
                        calculateValues(parseInt(newSize, 0));
                    });
                }
            };
        });

        return {
            m: module,
            name: moduleName
        };
    });
