'use strict';

var processIncludes = require('./tasks/processIncludes');

var jsFiles = [
  'Gruntfile.js', 'karma.conf.js', 'protractor.conf.js', 'tasks/*.js',
  'content/scripts/**/*.js', 'content/test/**/*.js'
];

module.exports = function (grunt) {
  grunt.initConfig({
    clean: {
      all: [ // deletes generated files
        'build',
        'content/index.html',
        'content/styles'
      ],
      index: [
        'content/index.html'
      ]
    },
    /* This can be used to server static files,
     * but mock-server.js also does that.
    connect: {
      server: {
        options: {
          port: 3000,
          base: 'content'
        }
      }
    },
    */
    copy: {
      usemin: {
        files: [
          {
            src: 'index.html',
            dest: 'index.min.html'
          }
        ]
      }
    },
    csslint: { // validates CSS files
      strict: {
        options: {
          // Most of these disabled options are for admin.css.
          'box-model': false,
          'font-sizes': false,
          ids: false,
          important: false,
          'overqualified-elements': false
        },
        src: ['build/styles/*.css']
      }
    },
    cssmin: { // creates content/seed.min.css from required CSS files
      all: {
        files: {
          'build/seed.min.css': [
            // files below must match link tags in content/index.html
            'build/lib/bootstrap/bootstrap.css',
            'build/lib/bootstrap/bootstrap-responsive.css',
            'build/styles/*.css'
          ]
        }
      },
    },
    /*
     * htmllint doesn't check indentation.
     * htmllint doesn't like AngularJS directives.
    htmllint: {
      all: ['content/*.html', 'content/partials/*.html']
    },
    */
    /* This is working fairly well now, but there may be cases
     * where the code it produces does not pass our jshint tests.
     * Only commit code that passes jshint tests.
     * Do not format files under lib directories!
     * There is a web UI for this at http://jsbeautifier.org.
     * The tool is in GitHub at http://github.com/einars/js-beautify.
     */
    jsbeautifier: {
      files: ['*.js', 'content/scripts/*.js', 'tasks/*.js'],
      options: {
        config: './jsbeautifier.json'
      }
    },
    jshint: { // validates JavaScript files
      all: jsFiles,
      options: {
        jshintrc: 'jshintrc'
      }
    },
    // Karma tests can also be run with "karma start".
    karma: {
      unit: {
        configFile: 'karma.conf.js'
      }
    },
    less: { // generates .css files from .less files
      all: {
        expand: true,
        cwd: 'content/less',
        src: '*.less',
        dest: 'content/styles',
        ext: '.css'
      }
    },
    markdownpdf: {
      options: {
        paperFormat: 'Letter'
      },
      files: {
        src: 'doc/*.md',
        dest: 'build/doc'
      }
    },
    /* TODO: Haven't been able to get this to work.
     * For now, run these tests with "protractor protractor.conf.js".
    protractor: {
      options: {
        configFile: 'protractor.conf.js',
        args: {}
      },
      all: {
        configFile: 'protractor.conf.js',
        args: {}
      }
    },
    */
    /* This runs the tests, but doesn't produce any output.
    protractor_simple: {
      options: {
        files: ['protractor.conf.js']
      }
    },
    */
    shell: {
      protractor: {
        // Runs Protractor tests.
        options: {
          stdout: true
        },
        command: 'protractor protractor.conf.js'
      },
      tomcat: {
        // starts local Tomcat server in another process,
        // allowing Grunt to exit
        options: {
          stdout: true
        },
        command: 'mvn tomcat7:run'
      }
    },
    uglify: { // creates content/seed.min.js from required JavaScript files
      all: {
        files: {
          'build/seed.min.js': [
            // files below must match script tags in content/index.html
            'build/lib/quirksmode-browser-detect.js',
            'build/lib/jquery-1.10.1.min.js',
            'build/lib/angular.min.js',
            'build/lib/bootstrap/js/bootstrap.min.js',
            'build/lib/lodash.min.js',
            'build/lib/tmhDynamicLocale.js',
            'build/scripts/state-select.js',
            'build/scripts/main.js',
            'build/scripts/*.js'
          ]
        }
      }
    },
    usemin: {
      // modifies copy of index.html to use
      // concatenated and minimized CSS and JavaScript
      all: {
        html: 'build/index.min.html',
        options: {
          dirs: ['build/lib', 'build/scripts', 'build/styles']
        }
      }
    },
    watch: {
      // watches certain files and runs specified tasks when they are modified
      options: {
        livereload: true
      },
      css: {
        files: ['build/styles/*.css'],
        tasks: ['csslint']
      },
      html: {
        files: ['content/*.html', 'content/partials/**/*.html'],
        // The following doesn't work when index.html is in use.
        //tasks: ['clean:index', 'processIncludes']
        tasks: []
      },
      js: {
        files: jsFiles,
        tasks: ['jshint'],
      },
      json: {
        files: ['content/L10n/*.json'],
        tasks: []
      },
      less: {
        files: ['content/less/*.less'],
        tasks: ['less']
      }
    }
  });

  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

  // Note: This doesn't work if "grunt watch" is running!
  grunt.registerTask('build', [
    'clean:all',
    'processIncludes',
    'less',
    'jshint'
  ]);

  //grunt.registerTask('default', ['build', 'mock-server', 'connect', 'watch']);
  grunt.registerTask('default', ['build', 'mock-server', 'watch']);

  // To use minimized version, browse localhost/index.min.html
  grunt.registerTask('min', ['less', 'cssmin', 'uglify', 'usemin']);

  var desc =
    'creates index.html from index-in.html by replacing include comments';
  grunt.registerTask('processIncludes', desc, function () {
    var done = this.async();

    var inPath = 'content/index-in.html';
    var outPath = 'content/index.html';
    processIncludes(inPath, outPath, function (err) {
      if (err) {
        grunt.log.error(err);
      } else {
        grunt.log.ok('generated ' + outPath);
      }
      done();
    });
  });

  // This starts a Node.js server that serves static content
  // and runs REST services implemented in Node.js.
  // If you get "Error: listen EADDRINUSE when running this,
  // try killing all running "node" processes and running this again.
  grunt.registerTask('mock-server', function () {
    grunt.util.spawn({
      cmd: 'node',
      args: ['mock-server.js'],
      opts: {
        stdio: 'inherit'
      }
    });
  });

  // This runs all the Protractor tests.
  // It assumes that mock-server is already running.
  // If you start mock-server and protractor from the same Grunt command,
  // it will fail to stop one of the node processes when it completes!
  grunt.registerTask('protractor', ['shell:protractor']);

  // This starts the Tomcat server.
  grunt.registerTask('server', ['build', 'shell:tomcat']);
};
