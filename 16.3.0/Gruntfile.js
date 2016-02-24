module.exports = function(grunt) {

var path = require("path");
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    docs: {
      source: '_book/',
      destination: '_book/',
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
    }
  });

  grunt.loadNpmTasks('grunt-contrib-cssmin');

  grunt.registerTask('default', ['cssmin']);

};
