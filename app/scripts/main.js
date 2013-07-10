'use strict';
require.config({
    paths: {
        'angular': 'vendor/angular-1.1.x/angular',
        'text': 'vendor/requirejs-text/text',
        'requireLib': 'vendor/requirejs/require',
        'jquery': 'vendor/jquery/jquery',
        'underscore': 'vendor/underscore-amd/underscore',
        'moment': 'vendor/moment/moment',
        'has': 'vendor/has/has'
    },
    shim : {
        angular  :{
            exports : "angular"
        }
    },
    urlArgs: "bust=" + (new Date()).getTime(),
    waitSeconds : 150
});

require(['AppInjector'], function (App) {
    App.initialize();
    return {};
});