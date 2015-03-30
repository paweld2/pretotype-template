define([
        'angular',
        "text!directive/template/dir/partials/menuDir.html"
    ],
    function(angular, menu_template) {
        'use strict';
        var moduleName = 'partialsDirectiveModule';
        var module = angular.module(moduleName, []);
        module.directive('niMenu', function() {
            return {
                restrict: "EA",
                template: menu_template,
                replace: true
            };
        });
        return {
            m: module,
            name: moduleName
        };
    });
