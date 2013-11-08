/* jshint node: true */

module.exports = function (grunt) {
    "use strict";
    // Project configuration.
    grunt.initConfig({

        // Metadata.
        pkg: grunt.file.readJSON('package.json'),
        banner: '/*!\n' +
            ' * Pretotype template v<%= pkg.version %> by Paweł Cesar Sanjuan Szklarz @PSanjuanSzklarz \n' +
            ' * Copyright <%= grunt.template.today("yyyy") %> <%= pkg.author %>\n' +
            ' * Licensed under <%= _.pluck(pkg.licenses, "url").join(", ") %>\n' +
            ' */\n\n',
        jshint: {
            options: {
                jshintrc: '.jshintrc'
            },
            gruntfile: {
                src: 'Gruntfile.js'
            },
            src: {
                src: ['app/scripts/*.js']
            },
            test: {
                src: ['app/tests/unit/*.js']
            }
        },

        recess: {
            options: {
                compile: true,
                banner: '<%= banner %>'
            },
            bootstrap_dev: {
                src: ['app/less/bootstrap.less'],
                dest: 'app/styles/app.css'
            },
            theme_dev: {
                src: ['app/less/theme.less'],
                dest: 'app/styles/app-theme.css'
            },
            bootstrap: {
                options: {
                    compress: true
                },
                src: ['app/less/bootstrap.less'],
                dest: 'dist/styles/app.min.css'
            },
            theme: {
                options: {
                    compress: true
                },
                src: ['app/less/theme.less'],
                dest: 'dist/styles/app-theme.min.css'
            }
        },
        clean: {
            dist: ['dist']
        },

        copy: {
            fonts: {
                expand: true,
                flatten: true,
                src: ["app/scripts/vendor/bootstrap/fonts/*"],
                dest: 'dist/fonts/'
            },
            fonts_dev: {
                expand: true,
                flatten: true,
                src: ["app/scripts/vendor/bootstrap/fonts/*"],
                dest: 'app/fonts/'
            },
            html : {
                src: ["app/appBin.html"],
                dest: 'dist/index.html'
            }
        },

        qunit: {
            options: {
                inject: 'js/tests/unit/phantom.js'
            },
            files: ['js/tests/*.html']
        },

        watch: {
            src: {
                files: '<%= jshint.src.src %>',
                tasks: ['jshint:src', 'qunit']
            },
            test: {
                files: '<%= jshint.test.src %>',
                tasks: ['jshint:test', 'qunit']
            },
            recess: {
                files: 'app/less/*.less',
                tasks: ['recess']
            }
        },
        requirejs: {
            compile: {
                options: {
                    baseUrl: "app/scripts",
                    name : "main",
                    out: 'dist/app_bin.js',
                    include : ["requireLib"],
                    paths: {
                        requireLib: 'vendor/requirejs/require'
                    },
                    mainConfigFile: 'app/scripts/main.js',
                    optimize: "uglify2",
                    throwWhen: {
                        optimize: true
                    },
                    has : {
                        consoleDebug : false
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
                    },
                    generateSourceMaps: true,
                    preserveLicenseComments: false
                }
            }
        },
        sed: {
            version: {
                path : ['dist/index.html'],
                pattern: '{{ version_data }}',
                replacement: '<%= pkg.version %>',
                recursive: false
            }
        },
        connect: {
            devserver: {
                options: {
                    port: 8001,
                    base: 'app'
                }
            },
            binserver: {
                options: {
                    port: 8001,
                    base: 'dist'
                }
            }
        },
        bower: {
            install: {
                cleanTargetDir : true
            }
        }
    });


    // These plugins provide necessary tasks.
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-qunit');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-requirejs');
    grunt.loadNpmTasks('grunt-sed');
    grunt.loadNpmTasks('grunt-recess');
    grunt.loadNpmTasks('grunt-bower-task');


    // CSS distribution task.
    grunt.registerTask('dist-css', ['recess']);
    grunt.registerTask('dist-js', ['requirejs']);
    grunt.registerTask('test', ['jshint']);

    // content distribution task.
    grunt.registerTask('dist-content', ['copy']);
    grunt.registerTask('dist-sed', ['sed']);

    // Full distribution task.
    grunt.registerTask('dist', ['clean', 'dist-css', 'dist-content', 'dist-js', 'dist-sed']);

    // Default task.
    grunt.registerTask('default', [ 'clean', 'dist']);


    grunt.registerTask('dev', [ 'copy:fonts_dev','connect:devserver','watch']);
    grunt.registerTask('bin', [ 'dist','connect:binserver','watch']);



};
