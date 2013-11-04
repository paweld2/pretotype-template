(function () {
    "use strict";
    require.config({
        paths: {
            'angular': 'vendor/angular/angular',
            'angularRoute': 'vendor/angular-route/angular-route',
            'text': 'vendor/requirejs-text/text',
            'requireLib': 'vendor/requirejs/require',
            'jquery': 'vendor/jquery/jquery',
            'underscore': 'vendor/underscore-amd/underscore',
            'moment': 'vendor/moment/moment',
            'has': 'vendor/has/has'
        },
        shim: {
            angular: {
                exports: "angular"
            },
            "angularRoute": {
                deps: ["angular"]
            }
        },
        urlArgs: "bust=" + (new Date()).getTime(),
        waitSeconds: 150
    });

    require(['AppInjector', 'angular'], function (App) {
        App.initialize();
        return {};
    });
}());