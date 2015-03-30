define([
        'angular',
        'has',
        'appConfig',
        'angular-mocks',
        'underscore',
        'utils/Logger',
        'utils/CookieLenses'
    ],
    function (angular, has, appConfig, mocks, _, logger, cookieLenses) {

        var moduleName = 'mockMainModule';
        var noOpModule = {
                         m: angular.module(moduleName, []),
                         name: moduleName,
                         registerSpecification: function (contract, spec) {
                             logger.log('No mocks. Ignoring api contract ' + contract.specification.id);
                         }
                     };

        var paramsMatcher = /:[^\/]*/;
        var paramsMatcherInFolder = /:[^\/]*\//;

        function createRegExpFromMethodUrl(base) {
            return function (url) {
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
            _.each(['PUT', 'POST', 'PATCH', 'GET', 'DELETE', 'JSONP', 'HEAD'], function (method) {
                registrationApi['when' + method] = function (url, headers) {
                    return {
                        call: function (callback) {
                            logger.log('registering endpoint: ' + method + ' on ' + (base + url));
                            var matcher = createMatcher(base, url);
                            $httpBackend['when' + method].apply({}, [matcher, headers]).respond(logger.wrapMock(callback));
                        }
                    };
                };
            });
            return registrationApi;
        }

        var globalState = {};
        var _specRegistry = [];
        module.run(['$httpBackend', cookieLenses.cookieCLen, function ($httpBackend, cookieCLen) {
            function _registerBackendSpecificationOnRuntime(data) {
                var apiContract = data.apiContract;
                var registerCallback = data.specification;

                var api = {
                    registrationApi: registrationApiBuilder(apiContract.base, $httpBackend),
                    methodRegexp: createRegExpFromMethodUrl(apiContract.base)
                };
                registerCallback.apply({}, [apiContract, globalState, cookieCLen, api]);
            }

            _.each(_specRegistry, _registerBackendSpecificationOnRuntime);

        }]);

        function _registerSpecification(contract, spec) {
            logger.log('registering api apiContract ' + contract.specification.id);
            _specRegistry.push({
                apiContract: contract.specification,
                specification: spec
            });
        }

        return {
            m: module,
            name: moduleName,
            registerSpecification: _registerSpecification
        };


        function loadMockBackend(listOfBackendSpecifications){
            if (!has('fakeBackend')) {
                return noOpModule;
            }

            var module = angular.module(moduleName, ['ngMockE2E', cookieLenses.name]);

            module.config(['$provide', function ($provide) {
                $provide.decorator('$httpBackend', angular.mock.e2e.$httpBackendDecorator);
            }]);
            if (has('delayFakeBackend')) {
                logger.log("delayFakeBackend  is set to " + appConfig.fakeBackendDelay);
                var delay = appConfig.fakeBackendDelay || 500;

                // this breaks tests on protractor, configuration is exposed for requirejs
                module.config(function ($provide) {
                    $provide.decorator('$httpBackend', ['$delegate', '$interval', '$q', function ($delegate, $interval, $q) {
                        var proxy = function (method, url, data, callback, headers) {
                            var interceptor = function () {
                                var _this = this,
                                    _arguments = arguments;
                                $interval(function () {
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
                }                                                                                                                                                                                                                                                                                                                                                                                                           );

        }


        }

        return {
            loadMockBackend : loadMockBackend
        };
    });
