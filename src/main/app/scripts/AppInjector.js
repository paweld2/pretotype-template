define([
        'utils/Logger',
        'angular',
        'mainAppRouting',
        'backendInfrastructure',
        'directive/appDirectives'
    ],
    function (logger, angular, has,  routing, backend,  appDirectives) {
        var initialize = function () {
            angular.element(document).ready(function () {
                var appName = "pretotype";
                var app = angular.module(appName,
                    [ routing.name, appDirectives.name, backend.name]
                );

                app.config([ '$locationProvider', function ($locationProvider) {
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
                        logger.log('App injector run.');
                    }]);

                angular.bootstrap(document, [appName]);
            });
        };
        return {
            initialize: initialize
        };
    });