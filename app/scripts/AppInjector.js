define([
    'utils/Logger',
    'angular',
    'angular-ui-router',
    "Services/servicesModule",
    "Directives/directivesModule",
    "Filters/filtersModule",
    "Controllers/controllersModule",
    "text!template/partials/state1.html",
    "text!template/partials/state1.list.html",
    "text!template/partials/state2.html",
    "text!template/partials/state2.list.html",
],
    function (logger, angular, uiroute, ServicesModule, Directives, Filters, Controllers, pa_s1, pa_s1_list, pa_s2, pa_s2_list ) {
        var initialize = function () {
            var app = angular.module("myApp",
                ['ui.router', ServicesModule.name, Controllers.name, Filters.name, Directives.name],
                ['$stateProvider', '$urlRouterProvider', '$locationProvider',
                    function ($stateProvider, $urlRouterProvider, $locationProvider) {
                        //
                        // For any unmatched url, redirect to /state1
                        $urlRouterProvider.otherwise("/state1");
                        //
                        // Now set up the states
                        $stateProvider
                            .state('state1', {
                                url: "/state1",
                                template: pa_s1
                            })
                            .state('state1.list', {
                                url: "/list",
                                template: pa_s1_list,
                                controller: ['$scope',function ($scope) {
                                    $scope.items = ["A", "List", "Of", "Items"];
                                }]
                            })
                            .state('state2', {
                                url: "/state2",
                                template: pa_s2
                            })
                            .state('state2.list', {
                                url: "/list",
                                template: pa_s2_list,
                                controller: ['$scope',function ($scope) {
                                    $scope.things = ["A", "Set", "Of", "Things"];
                                }]
                            });
                        $locationProvider.html5Mode(false);

                    }]);
            app.run(function () {
                console.log('injector run');
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