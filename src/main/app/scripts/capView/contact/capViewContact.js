define(
    [
        'capView/capViewRootLayout',
        'capabilities/auth/authorizationCapability',
        "text!./mainView.html"
    ],
    function (rootLayout, authorization, mainView) {
        var accessLevels = authorization.securityModel.accessLevels;

        var states = [{
            name: 'contact',
            url: "/contact",
            parent: rootLayout.rootState,
            ncyBreadcrumb: {
                label: 'contact',
                parent: rootLayout.ncyBreadcrumbParent
            },
            views: {
                rootLayoutContent: {
                    template: mainView
                }
            },
            access: accessLevels.public
        }];

        return {
            capViews: states,
            dependencies: [authorization.name]
        };
    });
