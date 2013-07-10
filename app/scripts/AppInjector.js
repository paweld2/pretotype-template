define([
    'utils/Logger',
    'angular',
    "Services/servicesModule",
    "Directives/directivesModule",
    "Filters/filtersModule",
    "Controllers/controllersModule",
    "text!template/Main.html",
    "text!template/ConfigurationView.html"
],
    function (logger,angular, ServicesModule,Directives,Filters,Controllers,mainTemplate,configTemplate) {
        var initialize = function (){
            var app = angular.module("myApp",
                [ServicesModule.name,Controllers.name,Filters.name,Directives.name],
                ['$routeProvider','$locationProvider','$logProvider',
                 function($routeProvider, $locationProvider,$logProvider) {
                 $logProvider.debugEnabled(true)
                $routeProvider.when('/', {
                    template: mainTemplate,
                    controller: 'MainCtrl'
                });
                $routeProvider.when('/config.html', {
                    template: configTemplate,
                    controller: 'ConfigCtrl'
                });
                $routeProvider.otherwise( { redirectTo: '/'} );

                $locationProvider.html5Mode(true);
            }]);
            app.run(function() {
                console.log('injector runnign');
            });

            console.log('init done');
            angular.element(document).ready(function() {
                angular.bootstrap(document, ['myApp']);
            });
        };
        return {
            initialize : initialize
        };
    });