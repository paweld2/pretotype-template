define(
    [
        'capView/capViewRootLayout',
        'capabilities/auth/authorizationCapability',
        "text!capView/stateTest/testContent.html",
        "text!capView/stateTest/state1.html",
        "text!capView/stateTest/state1.list.html",
        "text!capView/stateTest/state2.html",
        "text!capView/stateTest/state2.list.html"
    ],
    function (rootLayout, authorization, content_te, st1_te, st1_list_te, st2_te, st2_list_te) {
        var accessLevels = authorization.securityModel.accessLevels;

        var stateTest = [
            {
                name: 'state1',
                url: "/state1",
                parent: rootLayout.rootState,
                views: {
                    rootLayoutContent: {
                        template: st1_te
                    }
                },
                access: accessLevels.anyUser,
                children: [
                    {
                        name: "list",
                        url: "/list",
                        template: st1_list_te,
                        controller: ['$scope', function ($scope) {
                            $scope.items = ["A", "List", "Of", "Items"];
                        }],
                        data: {
                            access: accessLevels.anyUser
                        }
                    }
                ]
            },
            {
                name: 'state2',
                url: "/state2",
                parent: rootLayout.rootState,
                views: {
                    rootLayoutContent: {
                        template: st2_te
                    }
                },
                access: accessLevels.anyUser,
                children: [
                    {
                        name: "list",
                        url: "/list",
                        template: st2_list_te,
                        controller: ['$scope', function ($scope) {
                            $scope.items = ["XXX", "YYYY", "ZZZZ"];
                        }],
                        data: {
                            access: accessLevels.anyUser
                        }
                    }
                ]

            }
        ];

        return {
            capViews: stateTest,
            dependencies: [authorization.name]
        };
    });
