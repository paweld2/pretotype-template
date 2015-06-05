define([
        'utils/Logger',
        'angular',
        'angular-breadcrumb',
        'angular-sanitize',
        'angular-translate',
        'model',
        'mainAppRouting',
        'backendInfrastructure',
        'directive/appDirectives'
    ],
    function (logger, angular, breadcrumb, sanitize, translation, model, routing, backend, appDirectives) {
        var initialize = function () {
            angular.element(document).ready(function () {
                var appName = "pretotype";
                var app = angular.module(appName, ['pascalprecht.translate', 'ncy-angular-breadcrumb', 'ngSanitize', routing.name, appDirectives.name, backend.name]);

                app.config(['$locationProvider', function ($locationProvider) {
                    $locationProvider.html5Mode(false);
                }]);
                app.run(function () {
                    logger.log('injector run');
                });


                app.config(['$translateProvider', function ($translateProvider) {
                    $translateProvider.translations('en', model.contents.en.translate_json);
                    $translateProvider.translations('ja', model.contents.ja.translate_json);
                    $translateProvider.translations('pl', model.contents.pl.translate_json);
                    $translateProvider.preferredLanguage('en');
                    $translateProvider.useSanitizeValueStrategy('sanitize');
                }]);

                app.run(['$rootScope', '$state', '$stateParams', '$http',
                    function ($rootScope, $state, $stateParams, $http) {
                        $rootScope.$state = $state;
                        $rootScope.$stateParams = $stateParams;
                        $http.defaults.withCredentials = true;
                        logger.log('App injector run.');
                    }
                ]);

                angular.bootstrap(document, [appName]);
            });
        };
        return {
            initialize: initialize
        };
    });
