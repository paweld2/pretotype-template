exports.config = {
    seleniumAddress: 'http://localhost:4444/wd/hub',
    specs: ['e2e/*Test.js'],
    framework: 'jasmine2',
    jasmineNodeOpts: {
        showColors: true
    }
}