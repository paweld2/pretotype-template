/* Authorization capability */

define(
    ['angular', 'underscore',
        'utils/Logger',
        './securityAccess',
        './authorizationContract',
        'mixin/promiseTrackerMixin'
    ],
    function (angular, _, logger, securityAccess, contract, promiseTrackerMixin) {
        'use strict';

        var moduleName = 'authorizationCapabilityModule';
        var module = angular.module(moduleName, [contract.name, promiseTrackerMixin.name]);
        var authorizationServiceName = 'authorizationService';
        var authRootControllerName = 'AuthorizationCtrl';
        var loginControllerName = 'LoginCtrl';

        module.config(['$httpProvider',
            function ($httpProvider) {
                var interceptor = ['$location', '$q', '$injector', function ($location, $q, $injector) {
                    function success(response) {
                        return response;
                    }

                    function error(response) {
                        if (response.status === 401) {
                            logger.log("401 response, closing session");
                            $injector.get(authorizationServiceName).closeSession();
                            return $q.reject(response);
                        }
                        else {
                            return $q.reject(response);
                        }
                    }

                    return function (promise) {
                        return promise.then(success, error);
                    };
                }];
                $httpProvider.interceptors.push(interceptor);
            }]);
        module.run([authorizationServiceName, function (authService) {
            authService.validateSession();
        }]);
        module.factory(authorizationServiceName, [contract.service , function (authBackend) {
            var authService = {
                authenticate: function (user, successFunction, errorFunction) {
                    var l = new authBackend.login();
                    _.extend(l, user);
                    return l.$save(function (data) {
                        authService.status.currentUser = data;
                        authService.status.role = securityAccess.buildUserRole(data.authorization);
                        if (angular.isFunction(successFunction)) {
                            successFunction(data);
                        }
                    }, errorFunction);
                },
                logout: function (successLogoutFunction) {
                    authService.status.currentUser = undefined;
                    authService.status.role = securityAccess.buildUserRole({});
                    var logout = new authBackend.logout();
                    if (angular.isFunction(successLogoutFunction)) {
                        successLogoutFunction();
                    }
                    return logout.$save();
                },
                validateSession: function (successFunction) {
                    return authBackend.userInfo.get(function (data) {
                        authService.status.initializing = false;
                        authService.status.currentUser = data;
                        authService.status.role = securityAccess.buildUserRole(data.authorization);
                        if (angular.isFunction(successFunction)) {
                            successFunction(data);
                        }
                    }, closeSession);
                },
                status: {
                    initializing: true,
                    currentUser: undefined,
                    role: undefined
                }
            };

            function closeSession() {
                authService.status.currentUser = undefined;
                authService.status.role = securityAccess.userRoles.public;
            }

            return authService;
        }]);

        module.controller(loginControllerName,
            ['$scope', '$state', authorizationServiceName, promiseTrackerMixin.asyncTrackingScope, function ($scope, $state, authS, asyncTrackingScope) {
                asyncTrackingScope.asyncScope($scope);
                $scope.data = {};
                $scope.submit = function () {
                    $scope.error = false;
                    $scope.control.calling.addP(authS.authenticate($scope.data, function () {
                        $state.go('root.app');
                    }, function () {
                        $scope.error = true;
                    }));
                };
            }]);
        module.controller(authRootControllerName, ['$rootScope', '$scope', '$state', authorizationServiceName,
            function ($rootScope, $scope, $state, authS) {
                $scope.logout = function () {
                    return authS.logout(function () {
                        $state.go("root.app");
                    });
                };
                function checkRoleAndState(state, role) {
                    if (!angular.isDefined(state.data) || !angular.isDefined(state.data.access)) {
                        return true;
                    }
                    return state.data.access & role;
                }

                $scope.$watch(function () {
                    return authS.status;
                }, function (status) {
                    $scope.auth = {
                        initializing: status.initializing,
                        isLogged: angular.isDefined(status.currentUser),
                        session: status.currentUser
                    };
                    if (angular.isDefined(status.currentUser)) {
                        _.extend($scope.auth, status.currentUser.authorization);
                    }

                    if (angular.isDefined(status.role)) {
                        var allowed = checkRoleAndState($state.current, status.role);
                        if (!allowed) {
                            logger.log("Role changes and state not allowed. Going to init state");
                            $state.go("root.app");
                        }
                    }
                }, true);
                $rootScope.$on('$stateChangeStart',
                    function (event, toState, toParams, fromState, fromParams) {
                        if (angular.isDefined(authS.status.role)) {
                            var allowed = checkRoleAndState(toState, authS.status.role);
                            if (!allowed) {
                                logger.log("routing change not allowed, ignoring");
                                event.preventDefault();
                            }
                        }
                    });
            }]);

        return {
            m: module,
            authorizationService: authorizationServiceName,
            name: moduleName,
            loginController: loginControllerName,
            authRootController: authRootControllerName,
            securityModel: securityAccess
        };
    });
