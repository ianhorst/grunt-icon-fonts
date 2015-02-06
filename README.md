# grunt-iconfonts 0.1.0 [![Build Status: Linux](https://travis-ci.org/ianhorst/grunt-iconfonts.svg?branch=master)](https://travis-ci.org/ianhorst/grunt-iconfonts)


> Import icon fonts from icomoon.io

This plugin imports icon fonts downloaded from [icomoon.io](http://icomoon.io/). When task is completed, zip file is renamed.

## Getting Started
This plugin requires Grunt `~0.4.5`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-iconfonts --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-iconfonts');
```

## The "iconfonts" Task

### Overview
In your project's Gruntfile, add a section named `iconfonts` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  iconfonts: {
    options: {
      // Task-specific options go here.
    },
    your_target: {
      // Target-specific file lists and/or options go here.
    },
  },
});
```

### Options

#### options.src
Type: `String`
Default value:

REQUIRED. Specify the location of downloaded icomoon zip file.

#### options.cssDest
Type: `String`
Default value:

REQUIRED. Copy style.css from icomoon zip file to destination file.

#### options.fontsDest
Type: `String`
Default value: `'app/fonts'`

Copy all fonts files from icomoon zip file to destination path.

#### options.fontsPath
Type: `String`
Default value: `'../fonts'`

Fonts path relative to css file in a web browser.

### Usage Examples

#### Simple Example

```js
grunt.initConfig({
  iconfonts: {
    icomoon: {
      options: {
        src: '/Users/homer/Downloads/icomoon.zip',
        cssDest: 'app/styles/base/_icons.scss',
      }
    }
  },
});
```
#### Together with watch task

To import icon fonts automatically every time you download zip file, add the following configuration.

```js
grunt.initConfig({
  watch: {
    iconfonts: {
      options: {
        cwd: '/Users/homer/Downloads'
      },
      files: ['icomoon.zip'],
      tasks: ['iconfonts']
    }
  },
  iconfonts: {
    icomoon: {
      options: {
        src: '/Users/homer/Downloads/icomoon.zip',
        cssDest: 'app/styles/base/_icons.scss',
      }
    }
  },
});
```

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History

 * 2015-02-07   v0.1.1   Publishing to npm
 * 2015-02-07   v0.1.0   Initial release
