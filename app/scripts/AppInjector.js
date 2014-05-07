define([
    'utils/Logger',
    'angular',
    'angular-ui-router',
    "routing/mainAppRouting",
    "backend/mainAppBackend",
    "capabilities/controllersModule"
],
    function (logger, angular, uiroute, Routing, Backend, CapabilityTest) {
        var initialize = function () {
            angular.element(document).ready(function () {
                var appName = "pretotype";
                var app = angular.module(appName, ['ui.router', CapabilityTest.name, Routing.name, Backend.name]);
                app.config([ '$locationProvider',
                    function ($locationProvider) {
                        $locationProvider.html5Mode(false);
                    }]);
                app.run(function () {
                    logger.log('injector run');
                });

                app.run(['$rootScope', '$state', '$stateParams', '$http',
                    function ($rootScope, $state, $stateParams, $http) {
                        $rootScope.$state = $state;
                        $rootScope.$stateParams = $stateParams;
                        $http.defaults.withCredentials = true;
                    }]);
                angular.bootstrap(document, [appName]);
            });
        };
        return {
            initialize: initialize
        };
    });