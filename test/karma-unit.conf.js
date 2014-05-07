module.exports = function (config) {

    config.set({
        // base path, that will be used to resolve files and exclude
        basePath: '..',

        frameworks: ['jasmine','requirejs'],

        reporters: ['progress'],

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
        browsers: ['Chrome','Firefox'],
        captureTimeout: 10000,
        singleRun: false,
        reportSlowerThan: 500,

        plugins: [
            'karma-jasmine',
            'karma-chrome-launcher',
            'karma-firefox-launcher',
            'karma-requirejs'
        ],
        files: [
            {pattern: 'app/scripts/**/*.js', included: false},
            {pattern: 'test/unit/**/*.spec.js', included: false},
            'test/unit/unit-main.js'
        ]
    });
};
