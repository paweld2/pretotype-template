(function () {
    "use strict";
    var tests = [];
    for (var file in window.__karma__.files) {
        if (/^.base.test.midway.*spec\.js$/.test(file)) {
            tests.push(file);
            console.log("test loaded: " + file);
        }
    }
    require.config({
        baseUrl: '/base/app/scripts/',
        paths: {
            'angular': 'vendor/angular/angular',
            'angular-ui-router': 'vendor/angular-ui-router/release/angular-ui-router',
            'text': 'vendor/requirejs-text/text',
            'requireLib': 'vendor/requirejs/require',
            'jquery': 'vendor/jquery/jquery',
            'underscore': 'vendor/underscore-amd/underscore',
            'moment': 'vendor/moment/moment',
            'has': 'vendor/has/has',
            'chai': '../../node_modules/chai/chai',
            'ngMidwayTester': '../../node_modules/ng-midway-tester/src/ngMidwayTester.js'
        },
        shim: {
            angular: {
                exports: "angular"
            },
            "angular-ui-router": {
                deps: ["angular"]
            }
        },
        // ask Require.js to load these files (all our tests)
        deps: tests,
        // start test run, once Require.js is done
        callback: window.__karma__.start,

        waitSeconds: 150
    });
}());