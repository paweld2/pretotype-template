define(
    [
        'capView/capViewRootLayout',
        'capabilities/auth/authorizationCapability',
        'capabilities/administration/administrationCapability',
        'text!capView/crudTest/mainTe.html'
    ],
    function(rootLayout, authorization, administrationCapability, main_te) {
        var accessLevels = authorization.securityModel.accessLevels;

        var testCrudSubApp = {
            name: 'testCrud',
            parent: rootLayout.rootState,
            abstract: true,
            url: "/testCrud",
            views: {
                rootLayoutContent: {
                    template: '<div ui-view></div>'
                }
            },
            data: {
                access: accessLevels.admin
            }
        };
        var initView = {
            name: 'init',
            url: '/init',
            parent: testCrudSubApp,
            controller: administrationCapability.testCrud,
            template: main_te
        };
        return {
            capViews: [
                testCrudSubApp, initView
            ],
            dependencies: [authorization.name, administrationCapability.name]
        };
    });
