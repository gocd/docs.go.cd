module.exports = function (grunt) {

    var path = require("path");
    var process = require('process');

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        docs: {
            source: '_book/',
            destination: '_book/'
        },
        cssmin: {
            dist: {
                files: [{
                    expand: true,
                    cwd: '<%= docs.source %>',
                    src: ['**/*.css', '!**/*.min.css'],
                    dest: '<%= docs.destination %>',
                    ext: '.css'
                }]
            }
        },
        aws_s3: {
            options: {
                uploadConcurrency: 5, // 5 simultaneous uploads
                downloadConcurrency: 5 // 5 simultaneous downloads
            },
            production: {
                options: {
                    bucket: process.env.S3_BUCKET,
                    files: [
                        {
                            expand: true,
                            cwd: 'build',
                            src: ['**'],
                            dest: '/',
                            params: {CacheControl: 'max-age=600', ContentType: 'text/html'},
                            differential: true
                        }
                        // CacheControl only applied to the assets folder
                        // LICENCE inside that folder will have ContentType equal to 'text/plain'
                    ]
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-aws-s3');

    grunt.registerTask('default', ['cssmin']);

};
