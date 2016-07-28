define(
    [
        'capView/capViewRootLayout',
        'capabilities/auth/authorizationCapability',
        "text!./mainView.html"
    ],
    function(rootLayout, authorization, mainView) {
        var accessLevels = authorization.securityModel.accessLevels;

        var states = [{
            name: 'test2',
            url: "/test2",
            parent: rootLayout.rootState,
            ncyBreadcrumb: {
                label: 'Test 2',
                parent: rootLayout.ncyBreadcrumbParent
            },
            views: {
                rootLayoutContent: {
                    template: mainView
                }
            },
            access: accessLevels.admin
        }];

        return {
            capViews: states,
            dependencies: [authorization.name]
        };
    });
