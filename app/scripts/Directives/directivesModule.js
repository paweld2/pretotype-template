'use strict';



define(['angular'],function(angular){
    var moduleName = 'directivesModule';
    var module = angular.module(moduleName,[]);
    module.directive('mydirective',function(){
        return {
            restrict : "EA",
            template : "<strong>myAmazingDirective</strong>",
            replace : true
        };
    });
    module.directive('appVersion',['version',function(version){
        return function(scope, elm, attrs) {
            elm.text(version);
        };
    }]);
    return {
        m : module,
        name :moduleName
    }
});
