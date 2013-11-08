define([
    'utils/Logger',
    'angular',
    'angularRoute',
    "Services/servicesModule",
    "Directives/directivesModule",
    "Filters/filtersModule",
    "Controllers/controllersModule",
    "text!template/Main.html"
],
    function (logger, angular, angularRoute, ServicesModule, Directives, Filters, Controllers, mainTemplate) {
        var initialize = function () {
            var app = angular.module("myApp",
                ['ngRoute', ServicesModule.name, Controllers.name, Filters.name, Directives.name],
                ['$routeProvider', '$locationProvider', '$logProvider',
                    function ($routeProvider, $locationProvider, $logProvider) {
                        $logProvider.debugEnabled(true);
                        $routeProvider.when('/', {
                            template: mainTemplate,
                            controller: 'MainCtrl'
                        });
                        $routeProvider.otherwise({ redirectTo: '/'});

                        $locationProvider.html5Mode(false);

                    }]);
            app.run(function () {
                console.log('injector runnign');
            });

            console.log('init done');
            angular.element(document).ready(function () {
                angular.bootstrap(document, ['myApp']);
            });
        };
        return {
            initialize: initialize
        };
    });