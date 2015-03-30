define([
        'angular'
    ],
    function(angular) {
        'use strict';
        var moduleName = 'passwordMatchDirectiveModule';
        var module = angular.module(moduleName, []);
        module.directive('niPasswordMatch', [function() {
            return {
                restrict: 'A',
                scope: true,
                require: 'ngModel',
                link: function(scope, elem, attrs, control) {
                    var checker = function() {
                        //get the value of the first password
                        var e1 = scope.$eval(attrs.ngModel);
                        //get the value of the other password
                        var e2 = scope.$eval(attrs.niPasswordMatch);
                        // only check when all values are defined. If value is required, ten use require validation
                        return !angular.isDefined(e1) || !angular.isDefined(e2) || e1 === e2;
                    };
                    scope.$watch(checker, function(n) {

                        //set the form control to valid if both
                        //passwords are the same, else invalid
                        control.$setValidity("mismatch", n);
                    });
                }
            };
        }]);
        return {
            m: module,
            name: moduleName
        };
    });
