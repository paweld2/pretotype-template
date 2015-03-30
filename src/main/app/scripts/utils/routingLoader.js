define(
    [
        'underscore',
        'angular',
        'angular-ui-router',
        'utils/uiRouterStateHelper'
    ],
    function(_, angular, ui_router, uiRouterStateHelper) {
        function capabilitiesViewLoader(capabilityViewList) {

            var dependenciesArray = _.chain(capabilityViewList).map(function(capView) {
                return capView.dependencies || [];
            }).flatten(true).uniq().value();

            var statesList = _.chain(capabilityViewList).map(function(capView) {
                return capView.capViews || [];
            }).flatten(true).value();

            var moduleDependencies = ['ui.router', uiRouterStateHelper.name].concat(dependenciesArray);

            var moduleName = 'mainAppRouting';
            var module = angular.module(moduleName, moduleDependencies);

            module.config(['$stateProvider', '$urlRouterProvider', uiRouterStateHelper.helperProvider, function($stateProvider, $urlRouterProvider, stateHelperProvider) {
                // For any unmatched url, redirect to /
                $urlRouterProvider.otherwise("/");
                _.each(statesList, function(stateStructure) {
                    stateHelperProvider.setNestedState(stateStructure);
                });

            }]);

            return {
                m: module,
                name: moduleName
            };
        }
        return {
            capabilitiesViewLoader: capabilitiesViewLoader
        };
    });
