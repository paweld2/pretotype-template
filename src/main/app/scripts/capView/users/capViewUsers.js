define(
    [
        '../capViewRootLayout',
        'capabilities/users/usersAdminCapability',
        'capabilities/auth/authorizationCapability',
        "text!./mainView.html",
        "text!./usersMenu.html",
        "text!./usersAccessRights.html",
        "text!./usersSearch.html",
        "text!./usersInit.html"
    ],
    function(rootLayout, usersCap, authorization, mainView, usersMenuTe, usersAccessRightsTe, usersSearchTe, usersInitTe) {
        var accessLevels = authorization.securityModel.accessLevels;

        var usersMain = {
            name: 'users',
            url: "/users",
            parent: rootLayout.rootState,
            abstract: true,
            ncyBreadcrumb: {
                parent: rootLayout.ncyBreadcrumbParent
            },
            views: {
                rootLayoutContent: {
                    template: mainView
                }
            },
            data: {
                access: accessLevels.onlyAdmins
            },
            children: [{
                name: 'init',
                url: '/init',
                views: {
                    menuView: {
                        template: usersMenuTe
                    },
                    contentView: {
                        template: usersInitTe
                    }
                },
                data: {
                    access: accessLevels.onlyAdmins
                },
                ncyBreadcrumb: {
                    label: 'Użytkownicy',
                    parent: rootLayout.ncyBreadcrumbParent
                }
            }, {
                name: 'accessRights',
                url: '/accessRights',
                views: {
                    menuView: {
                        template: usersMenuTe
                    },
                    contentView: {
                        template: usersAccessRightsTe,
                        controller: usersCap.UserAccessRightsCtrl
                    }
                },
                data: {
                    access: accessLevels.onlyAdmins
                },
                ncyBreadcrumb: {
                    label: 'Prawa dostępu',
                    parent: '^.init'
                }
            }, {
                name: 'search',
                url: '/search',
                views: {
                    menuView: {
                        template: usersMenuTe
                    },
                    contentView: {
                        template: usersSearchTe,
                        controller: usersCap.UserSearchController
                    }
                },
                data: {
                    access: accessLevels.onlyAdmins
                },
                ncyBreadcrumb: {
                    label: 'Wyszukiwanie',
                    parent: '^.init'
                }
            }]
        };

        return {
            capViews: usersMain,
            dependencies: [authorization.name, usersCap.name]
        };
    });
