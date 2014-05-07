(function () {
    "use strict";
    require.config({
        paths: {
            'eelnss': 'vendor/eelnss/eelnss',
            'angular': 'vendor/angular/angular',
            'angular-mocks': 'vendor/angular-mocks/angular-mocks',
            'angular-ui-router': 'vendor/angular-ui-router/release/angular-ui-router',
            'angular-resource': 'vendor/angular-resource/angular-resource',
            'text': 'vendor/requirejs-text/text',
            'requireLib': 'vendor/requirejs/require',
            'underscore': 'vendor/underscore/underscore',
            'moment': 'vendor/moment/moment',
            'has': 'vendor/has/has'
        },
        shim: {
            angular: {
                exports: "angular"
            },
            "angular-ui-router": {
                deps: ["angular"]
            },
            "angular-mocks": {
                deps: ["angular"]
            },
            "angular-resource": {
                deps: ["angular"]
            },
            "eelnss": {
                deps: ["underscore"]
            }
        },
        urlArgs: "bust=" + (new Date()).getTime(),
        waitSeconds: 150
    });

    require(['AppInjector'], function (App) {
        App.initialize();
        return {};
    });
}());