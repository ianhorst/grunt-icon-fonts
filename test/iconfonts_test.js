'use strict';

var grunt = require('grunt');
var fs = require('fs');

exports.iconfonts = {
  setUp: function(done) {
    // setup here if necessary
    done();
  },
  'should copy .css file to dest': function (test) {
    fs.exists('tmp/styles/_icons.scss', function (exists) {
      test.ok(exists);
      test.done();
    });
  }
};
