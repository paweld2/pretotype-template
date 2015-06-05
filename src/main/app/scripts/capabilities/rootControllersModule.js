define(['angular', 'underscore','model'], function (angular, _,model) {
    var moduleName = 'controlModule';
    var module = angular.module(moduleName, []);

    var rootControllerName = 'RootController';

    var lang = 'en';

    function getContentModel() {
        return model.contents[lang].data;
    }
    module.controller(rootControllerName, ['$scope', '$state', '$translate',
        function ($scope, $state, $translate) {
            $scope.data = getContentModel();
            $scope.translate = function (langKey) {
                $translate.use(langKey);
                lang = langKey;
                $scope.data = getContentModel();
            };
        }]);
    return {
        m: module,
        name: moduleName,
        rootController: rootControllerName
    };
});
