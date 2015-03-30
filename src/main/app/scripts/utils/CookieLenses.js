define(['angular', 'eelnss', 'angular-cookies'], function(angular, lenses, cookies) {

    var moduleName = 'cookiesContextLenses';
    var module = angular.module(moduleName, ['ngCookies']);
    var cookiesContextLenName = "_cookieContextLenReference";
    module.factory(cookiesContextLenName, ['$httpBackend', '$cookies', function($httpBackend, $cookies) {
        function cookieGetter(context, a) {
            var value = $cookies[context];
            if (value) {
                try {
                    return JSON.parse(value);
                } catch (e) {
                    return void(0);
                }
            }
            return void(0);
        }

        function cookieSetter(context, value, a) {
            if (_.isUndefined(value)) {
                delete $cookies[context];
                return a;
            }
            $cookies[context] = JSON.stringify(value);
            return a;
        }

        function cookieExtractor(a) {
            return [_.keys($cookies)];
        }

        return lenses.contextLenses.defineContextLen(cookieGetter, cookieSetter, cookieExtractor, {
            contextSize: 1,
            valueSize: 1,
            signature: "_cookies",
            pointers: {},
            contextMap: ["_cookieParam"],
            valueMap: ["_cookies"]
        }, {}, "_cookies");
    }]);
    return {
        m: module,
        name: moduleName,
        cookieCLen: cookiesContextLenName
    };
});
