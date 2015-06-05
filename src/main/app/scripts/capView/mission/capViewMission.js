define(
    [
        'capView/capViewRootLayout',
        'capabilities/auth/authorizationCapability',
        "text!./mainView.html"
    ],
    function (rootLayout, authorization, mainView) {
        var accessLevels = authorization.securityModel.accessLevels;

        var states = [{
            name: 'mission',
            url: "/mission",
            parent: rootLayout.rootState,
            ncyBreadcrumb: {
                label: 'Our Misssion',
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
