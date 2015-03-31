define(
    [
        'capView/capViewRootLayout',
        'capabilities/auth/authorizationCapability',
        "text!./mainView.html"
    ],
    function(rootLayout, authorization, mainView) {
        var accessLevels = authorization.securityModel.accessLevels;

        var usersStates = [{
            name: 'users',
            url: "/users",
            parent: rootLayout.rootState,
            ncyBreadcrumb: {
                label: 'Użytkownicy',
                parent: rootLayout.ncyBreadcrumbParent
            },
            views: {
                rootLayoutContent: {
                    template: mainView
                }
            },
            access: accessLevels.admin,
            children: [{
                name: "list",
                url: "/list",
                template: "test",
                controller: ['$scope', function($scope) {
                    $scope.items = ["A", "List", "Of", "Items"];
                }],
                data: {
                    access: accessLevels.admin,
                }
            }]
        }];

        return {
            capViews: usersStates,
            dependencies: [authorization.name]
        };
    });
