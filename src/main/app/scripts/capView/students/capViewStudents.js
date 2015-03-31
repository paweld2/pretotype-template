define(
    [
        'capView/capViewRootLayout',
        'capabilities/auth/authorizationCapability',
        "text!./mainView.html"
    ],
    function(rootLayout, authorization, mainView) {
        var accessLevels = authorization.securityModel.accessLevels;

        var studentsStates = [{
            name: 'students',
            url: "/students",
            parent: rootLayout.rootState,
            ncyBreadcrumb: {
                label: 'Uczniowie',
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
            capViews: studentsStates,
            dependencies: [authorization.name]
        };
    });
