(function () {
    "use strict";
    var allTestFiles = [];
    var TEST_REGEXP = /\.spec\.js$/;

    var pathToModule = function(path) {
      return "../../../../" + path.replace(/^\/base\//, '').replace(/\.js$/, '');
    };

    Object.keys(window.__karma__.files).forEach(function(file) {
      if (TEST_REGEXP.test(file)) {
        // Normalize paths to RequireJS module names.
        var testFile = pathToModule(file);
        allTestFiles.push(testFile);
        console.log("test file added: " + testFile);
      }
    });
    require.config({
        baseUrl: '/base/src/main/app/scripts/',
        paths: {
            'eelnss': '../../../../bower_dependencies/vendor/eelnss/eelnss',
            'angular': '../../../../bower_dependencies/vendor/angular/angular',
            'angular-mocks': '../../../../bower_dependencies/vendor/angular-mocks/angular-mocks',
            'angular-ui-router': '../../../../bower_dependencies/vendor/angular-ui-router/release/angular-ui-router',
            'text': '../../../../bower_dependencies/vendor/requirejs-text/text',
            'requireLib': '../../../../bower_dependencies/vendor/requirejs/require',
            'underscore': '../../../../bower_dependencies/vendor/underscore/underscore',
            'moment': '../../../../bower_dependencies/vendor/moment/moment',
            'has': '../../../../bower_dependencies/vendor/has/has'
        },
        shim: {
            angular: {
                exports: "angular"
            },
            "angular-mocks": {
                deps: ["angular"]
            },
            "angular-ui-router": {
                deps: ["angular"]
            }
        },
        // ask Require.js to load these files (all our tests)
        deps: allTestFiles,
        // start test run, once Require.js is done
        callback: window.__karma__.start,

        waitSeconds: 150
    });
}());