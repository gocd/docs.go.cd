module.exports = function(grunt) {

var build_directory = grunt.option('build') || 'user'; 
var path = require("path");
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    docs: {
      source: build_directory+'/_book/',
      destination: build_directory+'/_book/',
    },
    htmlmin: {
      dist: {
        options: {
          removeComments: true,
          collapseWhitespace: true,
          removeRedundantAttributes: true,
          keepClosingSlash: true,
          minifyCSS: true,
          minifyJS: true 
        },
        files: [{
          expand: true,
          cwd: '<%= docs.source %>',
          src: ['**/*.html'],
          dest: '<%= docs.destination %>'
        }]
      }
    },
    uglify: {
      dist: {
        files: [{
            expand: true,
            cwd: '<%= docs.source %>',
            src: '**/*.js',
            dest: '<%= docs.destination %>'
        }]
      }
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
    imagemin: {               
        dist: {
          files: [{
            expand: true,                
            cwd: '<%= docs.source %>',
            src: ['**/*.{ico,png,jpg,gif,svg}'], 
            dest: '<%= docs.destination %>'
          }]
        }
      }      
    }
  );

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-htmlmin');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-imagemin');

  grunt.registerTask('default', ['htmlmin', 'uglify', 'cssmin', 'imagemin']);

};
