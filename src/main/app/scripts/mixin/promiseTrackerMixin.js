define(['angular', 'underscore', 'angular-promise-tracker'], function(angular, _, angular_pt) {
    'use strict';
    var moduleName = 'promiseTrackerMixin';
    var module = angular.module(moduleName, ['ajoslin.promise-tracker']);

    var promiseTrackingScopeMixin = "promiseTrackingScopeMixin";
    module.factory(promiseTrackingScopeMixin, ['promiseTracker', function(promiseTracker) {
        var asyncContextBuilder = function($scope, contextName) {
            if (!_.isString(contextName)) {
                throw new Error("initializing a async context name with no string name" + contextName);
            }
            $scope.control = $scope.control ? $scope.control : {};
            $scope.control[contextName] = promiseTracker();
            $scope.control[contextName].addP = function(p) {
                $scope.control[contextName].addPromise(p);
                return p;
            };
            $scope.control[contextName].addR = function(resource) {
                $scope.control[contextName].addPromise(resource.$promise);
                return resource;
            };
        };
        return {
            asyncScope: function($scope) {
                asyncContextBuilder($scope, "loading");
                asyncContextBuilder($scope, "calling");
            },
            asyncContext: asyncContextBuilder
        };
    }]);


    return {
        m: module,
        asyncTrackingScope: promiseTrackingScopeMixin,
        name: moduleName
    };
});
