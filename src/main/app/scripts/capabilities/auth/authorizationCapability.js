/* Authorization capability */

define(
    ['angular', 'underscore',
        'utils/Logger',
        './securityAccess',
        './authorizationContract',
        'mixin/promiseTrackerMixin',
        'utils/BackendSpecification'
    ],
    function(angular, _, logger, securityAccess, contract, promiseTrackerMixin, backendSpecBuilder) {
        'use strict';

        var contractBackend = backendSpecBuilder.buildResourceModulesFromContract(contract);

        var moduleName = 'authorizationCapabilityModule';
        var module = angular.module(moduleName, [contractBackend.name, promiseTrackerMixin.name]);
        var authorizationServiceName = 'authorizationService';
        var authRootControllerName = 'AuthorizationController';
        var loginControllerName = 'LoginController';

        module.config(['$httpProvider',
            function($httpProvider) {
                var interceptor = ['$location', '$q', '$injector', function($location, $q, $injector) {
                    function success(response) {
                        return response;
                    }

                    function error(response) {
                        if (response.status === 401) {
                            logger.log("401 response, closing session");
                            $injector.get(authorizationServiceName).closeSession();
                            return $q.reject(response);
                        } else {
                            return $q.reject(response);
                        }
                    }

                    return function(promise) {
                        return promise.then(success, error);
                    };
                }];
                $httpProvider.interceptors.push(interceptor);
            }
        ]);
        module.factory('principal', ['$q', contractBackend.service, function($q, authBackend) {
            var _identity,
                _authenticated = false;
            return {
                isIdentityResolved: function() {
                    return angular.isDefined(_identity);
                },
                isAuthenticated: function() {
                    return _authenticated;
                },
                checkAccess: function(access) {
                    var identifyAccess;
                    if (!_authenticated) {
                        identifyAccess = securityAccess.userRoles.public;
                    } else {
                        identifyAccess = _identity.access;
                    }
                    return identifyAccess & access;
                },
                isInRole: function(role) {
                    if (!_authenticated || !_identity.roles) return false;
                    return _identity.roles.indexOf(role) !== -1;
                },
                isInAnyRole: function(roles) {
                    if (!_authenticated || !_identity.roles) return false;
                    for (var i = 0; i < roles.length; i++) {
                        if (this.isInRole(roles[i])) return true;
                    }
                    return false;
                },
                authenticate: function(identity) {
                    _identity = identity;
                    _authenticated = identity != null;
                },
                identity: function(force) {
                    var deferred = $q.defer();

                    if (force === true) {
                        _identity = undefined;
                        _authenticated = undefined;
                    }

                    if (angular.isDefined(_identity)) {
                        deferred.resolve(_identity);
                        return deferred.promise;
                    }
                    authBackend.userInfo.get(function(data) {
                        logger.log("user info received - authenticated");
                        _identity = data;
                        _identity.access = securityAccess.buildUserRole(data.roles);
                        _authenticated = true;
                        deferred.resolve(_identity);
                    }, function() {
                        logger.log("user info empty - no authenticated");
                        _identity = null;
                        _authenticated = false;
                        deferred.resolve(_identity);
                    });
                    return deferred.promise;
                }
            };
        }]);

        module.factory(authorizationServiceName, ['$rootScope', '$state', 'principal', contractBackend.service, function($rootScope, $state, principal, authBackend) {
            var authService = {
                authorize: function() {
                    return principal.identity()
                        .then(function() {
                            var isAuthenticated = principal.isAuthenticated();

                            logger.log("on authorize: " + isAuthenticated);

                            if ($rootScope.toState.data && $rootScope.toState.data.access > 0 && !principal.checkAccess($rootScope.toState.data.access)) {
                                if (isAuthenticated) $state.go('accessDenied'); // user is signed in but not authorized for desired state
                                else {
                                    // user is not authenticated. stow the state they wanted before you
                                    // send them to the signin state, so you can return them when you're done
                                    $rootScope.returnToState = $rootScope.toState;
                                    $rootScope.returnToStateParams = $rootScope.toStateParams;

                                    // now, send them to the login state so they can log in
                                    $state.go('login');
                                }
                            }
                        });
                },
                authenticate: function(user, successFunction, errorFunction) {
                    var l = new authBackend.login();
                    _.extend(l, user);
                    return l.$save(function(data) {
                        principal.identity(true).then(function() {
                            if (angular.isFunction(successFunction)) {
                                successFunction(data);
                            }
                        });
                    }, errorFunction);
                },
                logout: function(successFunction) {
                    var logout = new authBackend.logout();
                    return logout.$save(function() {
                        principal.identity(true).then(function() {
                            if (angular.isFunction(successFunction)) {
                                successFunction();
                            }
                        });
                    });
                },
                status: {
                    initializing: true,
                    currentUser: undefined,
                    role: undefined
                }
            };

            return authService;
        }]);

        module.run(['$rootScope', '$state', '$stateParams', authorizationServiceName, 'principal',
            function($rootScope, $state, $stateParams, authorization, principal) {
                $rootScope.$on('$stateChangeStart', function(event, toState, toStateParams) {
                    // track the state the user wants to go to; authorization service needs this
                    $rootScope.toState = toState;
                    $rootScope.toStateParams = toStateParams;
                    // if the principal is resolved, do an authorization check immediately. otherwise,
                    // it'll be done when the state it resolved.
                    if (principal.isIdentityResolved()) authorization.authorize();
                });
            }
        ]);

        module.controller(loginControllerName, ['$rootScope', '$scope', '$state', authorizationServiceName, promiseTrackerMixin.asyncTrackingScope, function($rootScope, $scope, $state, authS, asyncTrackingScope) {
            asyncTrackingScope.asyncScope($scope);
            $scope.data = {};
            $scope.submit = function() {
                $scope.error = false;
                $scope.control.calling.addP(authS.authenticate($scope.data, function() {
                    if ($rootScope.returnToState) {
                        $state.go($rootScope.returnToState, $rootScope.returnToStateParams);
                    } else {
                        $state.go('root.app');
                    }
                }, function() {
                    $scope.error = true;
                }));
            };
        }]);
        module.controller(authRootControllerName, ['$rootScope', '$scope', '$state', 'principal', authorizationServiceName,
            function($rootScope, $scope, $state, principal, authS) {
                $scope.logout = function() {
                    return authS.logout(function() {
                        $state.go("root.app");
                    });
                };
                $scope.principal = principal;
            }
        ]);

        return {
            m: module,
            authorizationService: authorizationServiceName,
            name: moduleName,
            loginController: loginControllerName,
            authRootController: authRootControllerName,
            securityModel: securityAccess
        };
    });
