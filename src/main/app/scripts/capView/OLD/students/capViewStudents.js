define(
    [
        'scripts/capView/capViewRootLayout',
        'capabilities/auth/authorizationCapability',
        "text!./mainView.html",
        "text!./studentsInit.html",
        "text!./studentsMenu.html",
        "text!./studentsImportTe.html",
        "text!./studentsEditTe.html",
        "text!./studentsUpdateYearTe.html",
    ],
    function(rootLayout, authorization, mainView, studentsInit, studentsMenu, studentsImportTe, studentsEditTe, studentsUpdateYearTe) {
        var accessLevels = authorization.securityModel.accessLevels;

        var studentsMain = {
            name: 'students',
            url: "/students",
            parent: rootLayout.rootState,
            abstract: true,
            views: {
                rootLayoutContent: {
                    template: mainView
                }
            },
            data: {
                access: accessLevels.onlyAdmins
            },
            ncyBreadcrumb: {
                label: 'Uczniowie',
                parent: rootLayout.ncyBreadcrumbParent
            }
        };
        var studentsParent = {
            name: 'init',
            url: '/init',
            parent: studentsMain,
            views: {
                menuView: {
                    template: studentsMenu
                },
                contentView: {
                    template: studentsInit
                }
            },
            data: {
                access: accessLevels.onlyAdmins
            },
            ncyBreadcrumb: {
                label: 'Uczniowie',
                parent: rootLayout.ncyBreadcrumbParent
            }
        };
        studentsMain.children = [{
            name: 'import',
            url: '/import',
            views: {
                menuView: {
                    template: studentsMenu
                },
                contentView: {
                    template: studentsImportTe
                }
            },
            data: {
                access: accessLevels.onlyAdmins
            },
            ncyBreadcrumb: {
                label: 'Importowanie',
                parent: '^.init'
            }
        }, {
            name: 'edit',
            url: '/edit',
            views: {
                menuView: {
                    template: studentsMenu
                },
                contentView: {
                    template: studentsEditTe
                }
            },
            data: {
                access: accessLevels.onlyAdmins
            },
            ncyBreadcrumb: {
                label: 'Edytowanie',
                parent: '^.init'
            }
        }, {
            name: 'yearUpdate',
            url: '/yearUpdate',
            views: {
                menuView: {
                    template: studentsMenu
                },
                contentView: {
                    template: studentsUpdateYearTe
                }
            },
            data: {
                access: accessLevels.onlyAdmins
            },
            ncyBreadcrumb: {
                label: 'Zmiana roczników',
                parent: '^.init'
            }
        }];

        return {
            capViews: [
                studentsMain, studentsParent
            ],
            dependencies: [authorization.name]
        };
    });
