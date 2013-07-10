'use strict';

/* Services */

define(['angular'],function(angular){
    var moduleName = 'serviceModule';
    var module = angular.module(moduleName,[]);
    module.factory('version',function(){
            return "0.1" ;
    });
    return {
        m : module,
        name :moduleName
    }
});
