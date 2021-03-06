module.exports = function (config) {

    config.set({
        // base path, that will be used to resolve files and exclude
        basePath: '../../',

        frameworks: ['jasmine','requirejs'],

        reporters: ['progress','junit'],

        port: 9876,
        runnerPort: 9100,
        colors: true,
        logLevel: config.LOG_INFO,
        autoWatch: true,

        // Start these browsers, currently available:
        // - Chrome
        // - ChromeCanary
        // - Firefox
        // - Opera
        // - Safari (only Mac)
        // - PhantomJS
        // - IE (only Windows)
        // CLI --browsers Chrome,Firefox,Safari
//        browsers: ['Chrome','Firefox'],
//        browsers: ['Chrome','PhantomJS'],
        browsers: ['PhantomJS'],
        captureTimeout: 10000,
        singleRun: false,
        reportSlowerThan: 500,

        plugins: [
            'karma-jasmine',
            'karma-phantomjs-launcher',
            'karma-chrome-launcher',
            'karma-firefox-launcher',
            'karma-requirejs',
            'karma-junit-reporter'
        ],
        files: [
            {pattern: 'bower_dependencies/vendor/**/*.js', included: false},
            {pattern: 'src/main/app/scripts/**/*.js', included: false},
            {pattern: 'src/main/app/scripts/**/*.html', included: false},
            {pattern: 'src/test/unit/**/*.spec.js', included: false},
            'src/test/unit/unit-main.js'
        ],
        junitReporter : {
            outputFile: 'test_out/unit.xml',
            suite: 'unit'
        }
    });
};
