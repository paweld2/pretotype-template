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
            resolve: {
                authorize: [authorization.authorizationService,
                    function(authorization) {
                        return authorization.authorize();
                    }
                ]
            },
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
                    label: 'Pulpit'
                }
            }]
        };
        return {
            rootState: rootApp,
            ncyBreadcrumbParent: 'root.app',
            capViews: [
                rootApp
            ],
            dependencies: [authorization.name, capabilities.name]
        };
    });
