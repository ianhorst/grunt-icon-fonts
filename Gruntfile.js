/*
 * grunt-iconfonts
 * https://github.com/ianhorst/grunt-iconfonts
 *
 * Copyright (c) 2015 Ian Horst
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    jshint: {
      all: [
        'Gruntfile.js',
        'tasks/*.js',
        '<%= nodeunit.tests %>'
      ],
      options: {
        jshintrc: '.jshintrc'
      }
    },

    clean: {
      test: ['tmp']
    },

    iconfonts: {
      icomoon: {
        options: {
          src: 'tmp/icomoon.zip',
          cssDest: 'tmp/styles/_icons.scss',
          fontsDest: 'tmp/fonts'
        }
      }
    },

    copy: {
      test: {
        src: 'test/fixtures/icomoon.zip',
        dest: 'tmp/icomoon.zip'
      }
    },

    nodeunit: {
      tests: ['test/*_test.js']
    }

  });

  // Actually load this plugin's task(s).
  grunt.loadTasks('tasks');

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-nodeunit');
  grunt.loadNpmTasks('grunt-contrib-copy');

  // Whenever the "test" task is run, first clean the "tmp" dir, then run this
  // plugin's task(s), then test the result.
  grunt.registerTask('test', ['clean', 'copy', 'iconfonts', 'nodeunit']);

  // By default, lint and run all tests.
  grunt.registerTask('default', ['jshint', 'test']);

};
