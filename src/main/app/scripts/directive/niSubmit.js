define([
        'angular'
    ],
    function(angular) {
        'use strict';
        var moduleName = 'niSubmitDirectiveModule';
        var module = angular.module(moduleName, []);

        module.directive('niSubmit', ['$parse', function($parse) {
            return {
                require: 'form',
                link: function(scope, formElement, attributes, form) {
                    form.attempt = false;
                    formElement.bind('submit', function(event) {
                        form.attempt = true;
                        // some browsers don't trigger change after autocomplete, so make it before submit.
                        var toChange = formElement.find('input, textarea, select');
                        toChange.triggerHandler('input');
                        toChange.triggerHandler('change');
                        toChange.triggerHandler('keydown');
                        if (!scope.$$phase) scope.$apply();

                        var fn = $parse(attributes.niSubmit);

                        if (form.$valid) {
                            scope.$apply(function() {
                                fn(scope, {
                                    $event: event
                                });
                            });
                        }
                    });
                }
            };
        }]);

        return {
            m: module,
            name: moduleName
        };
    });
