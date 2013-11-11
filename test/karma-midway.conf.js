var shared = require('./karma-shared.conf');

module.exports = function(config) {
    shared(config);

    config.set({
        files: [
            {pattern: 'app/scripts/**/*.js', included: false},
            {pattern: 'app/scripts/**/*.html', included: false},
            {pattern: 'node_modules/chai/chai.js', included: false},
            {pattern: 'test/midway/**/*.spec.js', included: false},
            'test/midway/midway-main.js'
        ],
        urlRoot: '/_karma_/',
        proxies: {
            '/': 'http://localhost:8001/'
        }
    });
};
