define(
    [
        'capabilities/auth/authorizationCapability',
        'capabilities/controllersModule',
        'text!capView/rootLayoutTe.html',
        'text!capView/welcomePage.html'
    ],
    function(authorization, capabilities, rootLayout_te, welcome_te) {
        var accessLevels = authorization.securityModel.accessLevels;
        var rootApp = {
            name: 'root',
            template: rootLayout_te,
            abstract: true,
            controller: capabilities.rootController,
            children: [{
                name: 'app',
                url: "/",
                views: {
                    rootLayoutContent: {
                        template: welcome_te
                    }
                },
                data: {
                    access: accessLevels.public
                },
                ncyBreadcrumb: {
                    label: 'Start'
                }
            }]
        };
        return {
            rootState: rootApp,
            ncyBreadcrumbParent : 'root.app',
            capViews: [
                rootApp
            ],
            dependencies: [authorization.name, capabilities.name]
        };
    });
