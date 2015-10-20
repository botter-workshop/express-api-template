module.exports = function (grunt) {
    'use strict';

    require('load-grunt-tasks')(grunt);

    grunt.initConfig({
        apidoc: {
            default: {
                src: 'api/',
                dest: 'apidoc'    
            }
        },
        jshint: {
            default: {
                options: {
                    jshintrc: '.jshintrc',
                    reporter: grunt.option('jshint-teamcity') ? require('jshint-teamcity') : null
                },
                files: {
                    src: [
						'*.js',
						'api/**/*.js',
						'lib/**/*.js'
					]
                }
            }
        },
        environments: {
            options: {
                host: grunt.option('ssh-host'),
                local_path: '.',
                max_buffer: 1024 * 1024,
                releases_to_keep: 2,
				password: grunt.option('ssh-password'),
				username: grunt.option('ssh-username'),
                zip_deploy: true
            },
            development: {
                options: {
                    after_deploy: 'bash -i -c \'cd <%= environments.development.options.deploy_path %>/current && pm2 delete ecosystem.json && pm2 start ecosystem.json\'',
                    deploy_path: grunt.option('deploy-path')
                }
            }
        }
    });

    grunt.registerTask('default', [
        'apidoc:default'
    ]);

};
