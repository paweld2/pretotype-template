define(['angular', 'underscore'], function (angular, _) {
    var moduleName = 'controlModule';
    var module = angular.module(moduleName, []);

    var rootControllerName = 'RootController';

    module.controller(rootControllerName, ['$scope', '$state', '$translate',
        function ($scope, $state, $translate) {
            $scope.translate = function (langKey) {
                $translate.use(langKey);
                lang = langKey;
            };
        }]);
    return {
        m: module,
        name: moduleName,
        rootController: rootControllerName
    };
});
