define([
        'angular',
        'marked'
    ],
    function(angular, markedLib) {
        'use strict';
        var moduleName = 'markedJSModule';
        var module = angular.module(moduleName, []);
        // inspired in
        // https://github.com/Hypercubed/angular-marked

        module.constant('__marked', markedLib);

        module.directive('marked', ['__marked', function(marked) {
            return {
                restrict: 'AE',
                replace: true,
                scope: {
                    opts: '=',
                    mdFile: '=',
                    marked: '='
                },
                link: function(scope, element, attrs) {
                    var value = scope.marked || element.text() || '';
                    set(value);

                    function set(val) {
                        var m = marked(val || '', scope.opts || null);
                        element.html(m);
                    }

                    if (attrs.marked) {
                        scope.$watch('marked', set);
                    }

                }
            };
        }]);
        return {
            m: module,
            name: moduleName
        };
    });
