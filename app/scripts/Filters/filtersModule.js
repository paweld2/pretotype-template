'use strict';

/* Filters */

define(['angular'],function(angular){
    var moduleName = 'filtersModule';
    var module = angular.module(moduleName,[]);
    module.filter('interpolate',['version',function(version){
        return function(text) {
            return String(text).replace(/\%VERSION\%/mg, version);
        };
    }]);

    return {
        m : module,
        name :moduleName
    }
});
