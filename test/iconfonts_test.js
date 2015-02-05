'use strict';

var fs = require('fs');
var grunt = require('grunt');

exports.iconfonts = {
  setUp: function(done) {
    // setup here if necessary
    done();
  },
  css: function (test) {
    fs.exists('tmp/styles/_icons.scss', function (exists) {
      test.ok(exists, 'should be imported');
      test.done();
    });
  },
  fonts: function (test) {
    var extensions = ['woff', 'ttf', 'svg', 'eot'];

    extensions.forEach(function (ext) {
      var actual = grunt.file.read('tmp/fonts/icomoon.' + ext);
      var expected = grunt.file.read('test/expected/fonts/icomoon.' + ext);

      test.equal(actual, expected, 'should be imported');
    });

    test.done();
  }
};
