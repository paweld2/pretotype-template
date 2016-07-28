define(
    [
        'capView/capViewRootLayout',
        'capabilities/auth/authorizationCapability',
        "text!./mainView.html"
    ],
    function(rootLayout, authorization, mainView) {
        var accessLevels = authorization.securityModel.accessLevels;

        var states = [{
            name: 'test1',
            url: "/test1",
            parent: rootLayout.rootState,
            ncyBreadcrumb: {
                label: 'Test 1',
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
