define(
    [
        'capView/capViewRootLayout',
        'capabilities/auth/authorizationCapability',
        "text!./mainView.html"
    ],
    function (rootLayout, authorization, mainView) {
        var accessLevels = authorization.securityModel.accessLevels;

        var states = [{
            name: 'about',
            url: "/about",
            parent: rootLayout.rootState,
            ncyBreadcrumb: {
                label: 'About',
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
