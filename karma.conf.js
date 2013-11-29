// Karma configuration
// Generated on Mon Sep 30 2013 12:04:27 GMT-0500 (Central Daylight Time)

module.exports = function (config) {
  config.set({

    // base path, that will be used to resolve files and exclude
    basePath: '',

    // frameworks to use
    frameworks: ['jasmine'],

    // list of files / patterns to load in the browser
    files: [
      'content/lib/angularjs-1.2.2/angular.js',
      'content/lib/angularjs-1.2.2/angular-mocks.js',
      'content/lib/angular-ui-router.js',
      'content/lib/tmhDynamicLocale.js',
      'content/lib/jasmine.async.min.js',
      'content/lib/jquery-1.10.1.min.js',
      'content/lib/lodash.min.js',
      'content/lib/quirksmode-browser-detect.js',
      'content/scripts/main.js', // load before other files in dir
      'content/scripts/state-select.js', // ditto
      'content/scripts/*.js',
      'content/test/unit/**/*Spec.js'
    ],

    // list of files to exclude
    exclude: [
    ],

    // test results reporter to use
    // possible values: 'dots', 'progress', 'junit', 'growl', 'coverage'
    reporters: ['progress'],

    // web server port
    port: 9876,

    // enable / disable colors in the output (reporters and logs)
    colors: true,

    // level of logging
    // possible values: config.LOG_DISABLE, config.LOG_ERROR,
    //   config.LOG_WARN, config.LOG_INFO, config.LOG_DEBUG
    logLevel: config.LOG_INFO,
    //logLevel: config.LOG_DEBUG,

    // enable/disable watching files and executing tests when any file changes
    autoWatch: false,

    // Start these browsers, currently available:
    // - Chrome
    // - ChromeCanary
    // - Firefox
    // - Opera
    // - Safari (only Mac)
    // - PhantomJS
    // - IE (only Windows)
    //browsers: ['Chrome', 'Firefox', 'IE', 'PhantomJS'],
    browsers: ['PhantomJS'], // may get better stack traces with another browser

    // If browser does not capture in given timeout [ms], kill it
    captureTimeout: 30000,

    // Continuous Integration mode
    // if true, it capture browsers, run tests and exit
    singleRun: true
  });
};
