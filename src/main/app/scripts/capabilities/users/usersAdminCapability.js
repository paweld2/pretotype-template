/* Users administration capability */

define(
    ['angular', 'underscore',
        'utils/Logger',
        'mixin/promiseTrackerMixin',
        'utils/BackendSpecification',
        './usersContract'
    ],
    function(angular, _, logger, promiseTrackerMixin, backendSpecBuilder, contract) {
        'use strict';

        var contractBackend = backendSpecBuilder.buildResourceModulesFromContract(contract);

        var moduleName = 'userAdminCapabilityModule';
        var module = angular.module(moduleName, [promiseTrackerMixin.name, contractBackend.name]);
        var UserAccessRightsCtrl = 'UserAccessRightsController';
        var UserSearchController = 'UserSearchController';

        module.controller(UserAccessRightsCtrl, ['$scope', '$state', contractBackend.service, promiseTrackerMixin.asyncTrackingScope,
            function($scope, $state, service, asyncTrackingScope) {
                $scope.test = "ddd";
            }
        ]);
        module.controller(UserSearchController, ['$scope', '$state', contractBackend.service, promiseTrackerMixin.asyncTrackingScope,
            function($scope, $state, service, asyncTrackingScope) {
                asyncTrackingScope.asyncScope($scope);
                $scope.users = $scope.control.loading.addP(service.userList.query());
                //                $scope.control.loading.addP(authS.authenticate($scope.data, function() {
                //                                    $state.go('root.app');
                //                                }, function() {
                //                                    $scope.error = true;
                //                                }));
                $scope.test = "UserSearchController";
            }
        ]);

        return {
            m: module,
            name: moduleName,
            UserSearchController: UserSearchController,
            UserAccessRightsCtrl: UserAccessRightsCtrl
        };
    });
