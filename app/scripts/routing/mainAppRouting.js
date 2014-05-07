define(
    [   'angular',
        "text!template/initPage.html",
        "text!template/partials/menu.html",
        "text!template/partials/state1.html",
        "text!template/partials/state1.list.html",
        "text!template/partials/state2.html",
        "text!template/partials/state2.list.html"
    ], function (angular, pa_init, pa_menu, pa_s1, pa_s1_list, pa_s2, pa_s2_list) {
        var moduleName = 'mainAppRouting';
        var module = angular.module(moduleName, []);

        module.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
            //
            // For any unmatched url, redirect to /init
            $urlRouterProvider.otherwise("/app");
            //
            // Now set up the states
            $stateProvider
                .state('rootLayout', {
                    template: pa_init
                })
                .state('rootLayout.app', {
                    url: "/app",
                    views: {
                        menu: {
                            template: pa_menu
                        },
                        content: {
                            template: '<ui-view/>'
                        }
                    }
                })
                .state('rootLayout.app.state1', {
                    url: "/state1",
                    template: pa_s1
                })
                .state('rootLayout.app.state1.list', {
                    url: "/list",
                    template: pa_s1_list,
                    controller: ['$scope', function ($scope) {
                        $scope.items = ["A", "List", "Of", "Items"];
                    }]
                })
                .state('rootLayout.app.state2', {
                    url: "/state2",
                    template: pa_s2
                })
                .state('rootLayout.app.state2.list', {
                    url: "/list",
                    template: pa_s2_list,
                    controller: ['$scope', function ($scope) {
                        $scope.things = ["A", "Set", "Of", "Things"];
                    }]
                });
        }]);

        return {
            m: module,
            name: moduleName
        };
    });
