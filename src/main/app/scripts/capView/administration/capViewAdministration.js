define(
    [
        'capView/capViewRootLayout',
        'capabilities/auth/authorizationCapability',
        'capabilities/administration/administrationCapability',
        'text!./mainTe.html',
        'text!./menuPa.html',
        'text!./init.html',
        'text!./adminLogin.html',
        'text!./adminErrors.html',
        'text!./adminStatistics.html',
    ],
    function(rootLayout, authorization, administrationCapability, mainTe, menuPa, initTe, adminLoginTe, adminErrorsTe, adminStatisticsTe) {
        var accessLevels = authorization.securityModel.accessLevels;

        var adminSubApp = {
            name: 'administration',
            parent: rootLayout.rootState,
            abstract: true,
            url: "/administration",
            views: {
                rootLayoutContent: {
                    template: mainTe
                }
            },
            data: {
                access: accessLevels.admin
            },
            ncyBreadcrumb: {
                parent: rootLayout.ncyBreadcrumbParent
            }
        };
        var adminMenu = {
            name: 'init',
            url: '/init',
            parent: adminSubApp,
            views: {
                menuView: {
                    template: menuPa
                },
                contentView: {
                    template: initTe
                }
            },
            ncyBreadcrumb: {
                label: 'Zarządzanie'
            }
        };
        adminSubApp.children = [{
                name: 'login',
                url: '/login',
                views: {
                    menuView: {
                        template: menuPa
                    },
                    contentView: {
                        template: adminLoginTe
                    }
                },
                data: {
                    access: accessLevels.onlyAdmins
                },
                ncyBreadcrumb: {
                    label: 'Logowania',
                    parent: '^.init'
                }
            }, {
                name: 'errors',
                url: '/errors',
                views: {
                    menuView: {
                        template: menuPa
                    },
                    contentView: {
                        template: adminErrorsTe
                    }
                },
                data: {
                    access: accessLevels.onlyAdmins
                },
                ncyBreadcrumb: {
                    label: 'Błędy',
                    parent: '^.init'
                }
            }, {
                name: 'statistics',
                url: '/statistics',
                views: {
                    menuView: {
                        template: menuPa
                    },
                    contentView: {
                        template: adminStatisticsTe
                    }
                },
                data: {
                    access: accessLevels.onlyAdmins
                },
                ncyBreadcrumb: {
                    label: 'Statystyki',
                    parent: '^.init'
                }
            }

        ];
        return {
            capViews: [
                adminSubApp, adminMenu
            ],
            dependencies: [authorization.name, administrationCapability.name]
        };
    });
