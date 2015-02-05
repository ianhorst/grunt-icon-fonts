/*
 * grunt-iconfonts
 * https://github.com/ianhorst/grunt-iconfonts
 *
 * Copyright (c) 2015 Ian Horst
 * Licensed under the MIT license.
 */

'use strict';

var path = require('path');
var AdmZip = require('adm-zip');



module.exports = function(grunt) {


  var highlight = 'cyan';

  var defaults = {
    src: '~/Downloads/icomoon.zip',
    dest: {
      css: 'app/styles/_icons.scss',
      fonts: 'app/fonts'
    }
  }

  grunt.registerMultiTask('iconfonts', 'Import icon fonts from icomoon.io', function() {
    var options = this.options(defaults);

    var zip = openZip(options.src);

    grunt.verbose.writeln('Extracting', options.src[highlight]);
    copyCss(zip, options);
  });


  // PRIVATE

  var openZip = function (src) {
    try {
      return new AdmZip(src);
    } catch (e) {
      grunt.log.error(e, src);
    }
  }

  var copyCss = function (zip, options) {
    var name = path.basename(options.src, '.zip');
    var cssSrc = name + '/style.css';

    grunt.verbose.writeln('●', cssSrc[highlight], '->', options.dest.css[highlight]);

    var content = zip.readAsText(zip.getEntry(cssSrc));

    grunt.file.write(options.dest.css, content);
  }


};
