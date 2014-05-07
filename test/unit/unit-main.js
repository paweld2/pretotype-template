(function () {
    "use strict";
    var tests = [];
    for (var file in window.__karma__.files) {
        if (/^.base.test.unit.*spec\.js$/.test(file)) {
            tests.push(file);
            console.log("test loaded: " + file);
        }
    }
    require.config({
        baseUrl: '/base/',
        paths: {
            'eelnss': 'app/scripts/vendor/eelnss/eelnss',
            'angular': 'app/scripts/vendor/angular/angular',
            'angular-ui-router': 'app/scripts/vendor/angular-ui-router/release/angular-ui-router',
            'text': 'app/scripts/vendor/requirejs-text/text',
            'requireLib': 'app/scripts/vendor/requirejs/require',
            'underscore': 'app/scripts/vendor/underscore/underscore',
            'moment': 'app/scripts/vendor/moment/moment',
            'has': 'app/scripts/vendor/has/has'
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