/* Cookies EU policy directive */

define(
    [
        'angular',
        'utils/Logger',
        'utils/CookieLenses',
        'text!directive/template/dir/partials/cookiesEU.html'
    ],
    function(angular, logger, cookieLenses, cookies_te) {
        'use strict';
        var moduleName = 'cookiesCapabilityModule';
        var module = angular.module(moduleName, [cookieLenses.name]);
        module.directive('niCookieEu', function() {
            return {
                restrict: "EA",
                template: cookies_te,
                replace: true,
                scope: {},
                controller: ['$scope', cookieLenses.cookieCLen,
                    function($scope, cookieCLen) {
                        var euCookie = cookieCLen.bindContext(["cookie-ue-policy"]);
                        $scope.showCookiesInfo = !angular.isDefined(euCookie.get({}));
                        $scope.acceptCookies = function() {
                            euCookie.set("ok", {});
                            $scope.showCookiesInfo = false;
                        };
                    }
                ]
            };
        });

        return {
            m: module,
            name: moduleName
        };
    });
