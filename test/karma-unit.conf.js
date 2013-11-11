var shared = require('./karma-shared.conf');

module.exports = function (config) {
    shared(config);

    config.set({
        files: [
            {pattern: 'app/scripts/**/*.js', included: false},
            {pattern: 'node_modules/chai/chai.js', included: false},
            {pattern: 'test/unit/**/*.spec.js', included: false},
            'test/unit/unit-main.js'
        ]
    });
};
