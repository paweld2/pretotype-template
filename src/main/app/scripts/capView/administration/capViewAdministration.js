define(
    [
        'capView/capViewRootLayout',
        'capabilities/auth/authorizationCapability',
        'capabilities/administration/administrationCapability',
        'text!./mainTe.html',
        'text!./menuPa.html',
        'text!./init.html',
        'text!./students_help.html',
        'text!./students_edition.html',
        'text!./students_upgrade.html',
        'text!./students_import.html'
    ],
    function(rootLayout, authorization, administrationCapability, main_te, menuPa, init_te, students_help_te, students_edition_te, students_upgrade_te, students_import_te) {
        var accessLevels = authorization.securityModel.accessLevels;

        var adminSubApp = {
            name: 'administration',
            parent: rootLayout.rootState,
            abstract: true,
            url: "/administration",
            views: {
                rootLayoutContent: {
                    template: main_te
                }
            },
            data: {
                access: accessLevels.admin
            },
            ncyBreadcrumb: {
                label: 'Administracja',
                parent: rootLayout.ncyBreadcrumbParent
            }
        };
        var adminMenu = {
            name: 'menu',
            url: '/menu',
            parent: adminSubApp,
            views: {
                menuView: {
                    template: menuPa
                },
                contentView: {
                    template: init_te
                }
            },
            ncyBreadcrumb: {
                label: 'Administracja'
            }
        };
        var studentsSubApp = {
            name: 'students',
            url: '/students',
            abstract: true,
            parent: adminSubApp,
            views: {
                menuView: {
                    template: menuPa
                },
                contentView: {
                    template: '<div ui-view></div>'
                },
                data: {
                    access: accessLevels.onlyAdmins
                }
            },
            children: [{
                name: 'help',
                url: '/',
                template: students_help_te,
                data: {
                    access: accessLevels.onlyAdmins
                },
                ncyBreadcrumb: {
                    label: 'Studenci',
                    parent: '^.^.menu'
                }
            }, {
                name: 'import',
                url: '/import',
                template: students_import_te,
                data: {
                    access: accessLevels.onlyAdmins
                },
                ncyBreadcrumb: {
                    label: 'Importowanie',
                    parent: '^.help'
                }
            }, {
                name: 'edit',
                url: '/edit',
                controller: administrationCapability.studentsEditionController,
                template: students_edition_te
            }, {
                name: 'upgrade',
                url: '/upgrade',
                template: students_upgrade_te,
                data: {
                    access: accessLevels.onlyAdmins
                }
            }]
        };
        return {
            capViews: [
                adminSubApp, adminMenu, studentsSubApp
            ],
            dependencies: [authorization.name, administrationCapability.name]
        };
    });
