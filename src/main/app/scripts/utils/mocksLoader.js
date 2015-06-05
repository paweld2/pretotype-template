define([
        'angular',
        'has',
        'appConfig',
        'angular-mocks',
        'underscore',
        'utils/Logger',
        'utils/CookieLenses'
    ],
    function(angular, has, appConfig, mocks, _, logger, cookieLenses) {

        var moduleName = 'mockMainModule';

        var paramsMatcher = /:[^\/]*/;
        var paramsMatcherInFolder = /:[^\/]*\//;

        function createRegExpFromMethodUrl(base) {
            return function(url) {
                var realUrl = base + url;
                var urlPattern = realUrl.replace(paramsMatcherInFolder, "(\\w+)/");
                urlPattern = urlPattern.replace(paramsMatcher, "(\\w+)");
                return new RegExp(urlPattern, "g");
            };
        }

        function createMatcher(base, url) {
            if (url.indexOf(":") === -1) {
                return base + url;
            }
            var urlPattern = url.replace(paramsMatcherInFolder, "(\\w+)/");
            urlPattern = urlPattern.replace(paramsMatcher, "(\\w+)");
            var regexp = new RegExp(urlPattern, "g");
            return regexp;
        }

        function registrationApiBuilder(base, $httpBackend) {
            var registrationApi = {};
            _.each(['PUT', 'POST', 'PATCH', 'GET', 'DELETE', 'JSONP', 'HEAD'], function(method) {
                registrationApi['when' + method] = function(url, headers) {
                    return {
                        call: function(callback) {
                            logger.log('registering endpoint: ' + method + ' on ' + (base + url));
                            var matcher = createMatcher(base, url);
                            $httpBackend['when' + method].apply({}, [matcher, headers]).respond(logger.wrapMock(callback));
                        }
                    };
                };
            });
            return registrationApi;
        }

        function setupDelayedProxyOnMocks(module) {
            logger.log("delayFakeBackend  is set to " + appConfig.fakeBackendDelay);
            var delay = appConfig.fakeBackendDelay || 500;
            // this breaks tests on protractor, configuration is exposed for requirejs
            module.config(function($provide) {
                $provide.decorator('$httpBackend', ['$delegate', '$interval', '$q', function($delegate, $interval, $q) {
                    var proxy = function(method, url, data, callback, headers) {
                        var interceptor = function() {
                            var _this = this,
                                _arguments = arguments;
                            $interval(function() {
                                callback.apply(_this, _arguments);
                            }, delay, 1);
                        };
                        return $delegate.call(this, method, url, data, interceptor, headers);
                    };
                    for (var key in $delegate) {
                        proxy[key] = $delegate[key];
                    }
                    return proxy;
                }]);
            });
        }

        function createMockedBackendModule(listOfBackendSpecifications) {
            var globalState = {};

            var module = angular.module(moduleName, ['ngMockE2E', cookieLenses.name]);
//            module.config(['$provide', function($provide) {
//                $provide.decorator('$httpBackend', angular.mock.e2e.$httpBackendDecorator);
//            }]);
            if (has('delayFakeBackend')) {
                setupDelayedProxyOnMocks(module);
            }
            module.run(['$httpBackend', cookieLenses.cookieCLen, function($httpBackend, cookieCLen) {
                function _registerBackendSpecificationOnRuntime(backendSpecification) {
                    var apiContract = backendSpecification.apiContract;
                    var registerCallback = backendSpecification.specificationRegistration;
                    var api = {
                        registrationApi: registrationApiBuilder(apiContract.base, $httpBackend),
                        methodRegexp: createRegExpFromMethodUrl(apiContract.base)
                    };
                    registerCallback.apply({}, [globalState, cookieCLen, api]);
                }
                _.each(listOfBackendSpecifications, _registerBackendSpecificationOnRuntime);
                $httpBackend.whenGET(/\/en.*/).passThrough();
                $httpBackend.whenGET(/\/ja.*/).passThrough();;
                $httpBackend.whenGET("/en/data/about.md").passThrough();
            }]);
            return {
                m: module,
                name: moduleName
            };
        }

        var noOpModule = {
            m: angular.module(moduleName, []),
            name: moduleName
        };


        function loadMockBackend(listOfBackendSpecifications) {
            if (!has('fakeBackend')) {
                return noOpModule;
            }
            return createMockedBackendModule(listOfBackendSpecifications);
        }

        return {
            loadMockBackend: loadMockBackend
        };
    });
