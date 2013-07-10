({
    baseUrl: "../scripts",
    name: 'main',
    out: '../../dist/app_bin.js',
    include : ["requireLib"],
    paths: {
        requireLib: 'vendor/requirejs/require'
    },
    mainConfigFile: '../scripts/main.js',
    optimize: "uglify2",
    throwWhen: {
        optimize: true
    },
    has : {
      consoleDebug : true
    },
    shim : {
        angular  :{
            exports : "angular"
        }
    },
    uglify2: {
        output: {
            beautify: false
        },
        compress: {
            sequences: false,
            dead_code : true,
            unused : true,
            global_defs: {
                DEBUG: false
            }
        },
        warnings: true,
        mangle: true
    }
})

