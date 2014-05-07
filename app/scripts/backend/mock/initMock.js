define(['angular', 'has', 'appConfig', 'angular-mocks'], function (angular, has, appConfig, mocks) {
    var moduleName = 'mockMainModule';
    var module = angular.module(moduleName, ['ngMockE2E']);

    if (!has('fakeBackend')) {
        // no mock backend, so just return a empty angular module
        return {
            m: module,
            name: moduleName
        };
    }

    module.config(['$provide', function ($provide) {
        $provide.decorator('$httpBackend', angular.mock.e2e.$httpBackendDecorator);
    }]);
    if (has('delayFakeBackend')) {
        var delay = appConfig.fakeBackendDelay || 500;
        // this breaks tests on protractor, configuration is expose for requirejs
        module.config(function ($provide) {
            $provide.decorator('$httpBackend', function ($delegate) {
                var proxy = function (method, url, data, callback, headers) {
                    var interceptor = function () {
                        var _this = this,
                            _arguments = arguments;
                        setTimeout(function () {
                            callback.apply(_this, _arguments);
                        }, delay);
                    };
                    return $delegate.call(this, method, url, data, interceptor, headers);
                };
                for (var key in $delegate) {
                    proxy[key] = $delegate[key];
                }
                return proxy;
            });
        });
    }
    return {
        m: module,
        name: moduleName
    };
});
