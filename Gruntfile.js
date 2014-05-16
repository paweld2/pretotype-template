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
                src: ['app/scripts/*.js', 'app/scripts/**/*.js'],
                ignore: ['app/scripts/vendor']
            },
            test: {
                src: ['app/tests/unit/*.js']
            }
        },

        less: {
            bootstrap_dev: {
                files: {
                    'app/styles/app.css': 'app/less/bootstrap.less'
                }
            },
            theme_dev: {
                files: {
                    'app/styles/app-theme.css': 'app/less/theme.less'
                }
            },
            bootstrap: {
                options: {
                    cleancss: true,
                    compress: true
                },
                files: {
                    'dist/styles/app.min.css': 'app/less/bootstrap.less'
                }
            },
            theme: {
                options: {
                    cleancss: true,
                    compress: true
                },
                files: {
                    'dist/styles/app-theme.min.css': 'app/less/theme.less'
                }
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
            assets: {
                expand: true,
                flatten: true,
                src: ["app/assets/*"],
                dest: 'dist/assets/'
            },
            fonts_dev: {
                expand: true,
                flatten: true,
                src: ["app/scripts/vendor/bootstrap/fonts/*"],
                dest: 'app/fonts/'
            },
            html: {
                src: ["app/appBin.html"],
                dest: 'dist/index.html'
            }
        },
        watch: {
            src: {
                files: '<%= jshint.src.src %>',
                tasks: ['jshint:src']
            },
            test: {
                files: '<%= jshint.test.src %>',
                tasks: ['jshint:test']
            },
            less: {
                files: ['app/less/*.less'],
                tasks: ['less:bootstrap_dev', 'less:theme_dev'],
                options: {
                    livereload: true
                }
            },
            templates: {
                files: ['app/scripts/**/*.html'],
                options: {
                    livereload: true
                }
            },
            karma: {
                files: ['<%= jshint.src.src %>', '<%= jshint.test.src %>', 'app/scripts/**/*.html', 'test/**/*.js'],
                tasks: ['karma:unit_watch:run']
            }
        },
        requirejs: {
            compile: {
                options: {
                    baseUrl: "app/scripts",
                    name: "main",
                    out: 'dist/app_bin.js',
                    include: ["requireLib"],
                    paths: {
                        requireLib: 'vendor/requirejs/require'
                    },
                    mainConfigFile: 'app/scripts/main.js',
                    optimize: "uglify2",
                    throwWhen: {
                        optimize: true
                    },
                    has: {
                        consoleDebug: true,
                        fakeBackend: true
                    },
                    fakeBackendDelay: 6000,
                    shim: {
                        angular: {
                            exports: "angular"
                        }
                    },
                    uglify2: {
                        output: {
                            beautify: false
                        },
                        compress: {
                            sequences: false,
                            dead_code: true,
                            unused: true,
                            global_defs: {
                                DEBUG: false
                            }
                        },
                        warnings: true,
                        mangle: true
                    },
                    optimizeAllPluginResources: false,
                    generateSourceMaps: false,
                    preserveLicenseComments: true
                }
            }
        },
        sed: {
            version: {
                path: ['dist/index.html'],
                pattern: '{{ version_data }}',
                replacement: '<%= pkg.version %>',
                recursive: false
            }
        },
        connect: {
            debugserver: {
                options: {
                    port: 8001,
                    base: 'app',
                    keepalive:true
                }
            },
            devserver: {
                options: {
                    port: 8001,
                    base: 'app',
                    livereload: true
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
                cleanTargetDir: true
            }
        },
        karma: {
            unit: {
                configFile: './test/karma-unit.conf.js',
                autoWatch: false,
                singleRun: true
            },
            unit_watch: {
                configFile: './test/karma-unit.conf.js',
                background: true
            }
        }
    });


    // These plugins provide necessary tasks.
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-requirejs');
    grunt.loadNpmTasks('grunt-sed');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-bower-task');
    grunt.loadNpmTasks('grunt-karma');


    // CSS distribution task.
    grunt.registerTask('dist-css', ['less']);
    grunt.registerTask('dist-js', ['requirejs']);
    grunt.registerTask('test', ['jshint', 'karma:unit']);

    // content distribution task.
    grunt.registerTask('dist-content', ['copy']);
    grunt.registerTask('dist-sed', ['sed']);

    // Full distribution task.
    grunt.registerTask('dist', ['clean', 'dist-css', 'dist-content', 'dist-js', 'dist-sed']);

    // Default task.
    grunt.registerTask('default', [ 'clean', 'dist']);
    grunt.registerTask('dev_watch_mode', [ 'karma:unit_watch','watch']);


    grunt.registerTask('dev', [ 'copy:fonts_dev', 'connect:devserver', 'less:theme_dev', 'less:bootstrap_dev', 'dev_watch_mode']);
    grunt.registerTask('bin', [ 'dist', 'connect:binserver', 'watch']);


};
