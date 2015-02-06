/*
 * grunt-iconfonts
 * https://github.com/ianhorst/grunt-iconfonts
 *
 * Copyright (c) 2015 Ian Horst
 * Licensed under the MIT license.
 */

'use strict';

var fs = require('fs');
var path = require('path');
var AdmZip = require('adm-zip');
var moment = require('moment');


module.exports = function(grunt) {

  var highlight = 'cyan';

  grunt.registerMultiTask('iconfonts', 'Import icon fonts from icomoon.io', function() {
    var options = this.options({
      fontsDest: 'app/fonts',
      fontsUrl: '../fonts'
    });

    // Check required options
    ['src', 'cssDest'].forEach(function (attr) {
      if (!options[attr]) {
        grunt.fail.fatal('Please specify options.src');
      }
    });

    // Open ZIP file
    try {
      var zip = AdmZip(options.src);
    } catch (e) {
      grunt.log.error(e, src);
      grunt.log.fatal();
    }

    var copyCss = function (zip) {
      var name = projectName(options);
      var src = path.join('style.css');

      grunt.verbose.writeln('●', src[highlight], '->', options.cssDest[highlight]);

      var content = zip.readAsText(zip.getEntry(src));

      grunt.file.write(options.cssDest, replaceFontsUrl(content, options));
    }

    var copyFonts = function (zip) {
      var name = projectName(options);
      var extensions = ['woff', 'ttf', 'eot', 'svg'];

      extensions.forEach(function (ext) {
        var filename = [name, ext].join('.');
        var src = path.join('fonts', filename);
        grunt.verbose.writeln('●', src[highlight], '->', options.fontsDest[highlight]);

        var content = zip.readFile(zip.getEntry(src));
        grunt.file.write(path.join(options.fontsDest, filename), content);
      });
    }

    var projectName = function () {
      return path.basename(options.src, '.zip');
    }

    var archiveZip = function (src) {
      var hash = moment().format('YYYYMMDD-HHmmss');
      var dir = path.dirname(src);
      var name = path.basename(src, '.zip');
      var archivedName = [name, hash, 'zip'].join('.');

      // grunt.file can delete files only in cwd
      fs.rename(src, path.join(dir, archivedName));
    }

    var replaceFontsUrl = function (css) {
      return css.replace(/fonts/g, options.fontsUrl)
    }


    grunt.verbose.writeln('Processing', options.src[highlight]);

    copyCss(zip);
    copyFonts(zip);
    archiveZip(options.src);
  });

};

