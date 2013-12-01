# My AngularJS Seed

This is a Web application that provides a good starting point for
building new Web applications that use AngularJS and Twitter Bootstrap.

It automates many tasks using Grunt.  These include:
* grunt - (default) runs the build, mock-server and watch tasks
* grunt build - runs the clean:all, processIncludes, less and jshint tasks
* grunt clean:all - deletes all generated files
* grunt csslint - checks all CSS files
* grunt cssmin - concatenates and minifies all CSS files into one
* grunt jsbeautifier - reformats all JavaScript files
* grunt jshint - checks all JavaScript files
* grunt karma - runs all Karma tests (unit tests, not end-to-end)
* grunt less - generates .css files from .less files
* grunt markdownpdf - generates PDF files from Markdown files
* grunt min - runs the less, cssmin, uglify and usemin tasks
* grunt mock-server - runs a Node.js server that serves static content,
    hosts mock REST services, and delegates to the Tomcat server for other requests
* grunt processIncludes - generates index.html from index-in.html, processing includes
* grunt protractor - runs all Protractor tests (end-to-end tests, not unit)
* grunt server - runs the build and shell:tomcat tasks
* grunt shell:protractor - runs all Protractor tests
* grunt shell:tomcat - starts a Tomcat server (many projects will not want this)
* grunt uglify - concatenates and minifies all JavaScript files into one
* grunt usemin - creates index.min.html from index.html where
  most link tags are replaced by one and
  most script tags are replaced by one
* grunt watch - watches certain files for changes and runs appropriate tasks
    when they do; reloads the web browser when files change for quick UI feedback

Here are some steps to get started:

1. clone this Git repo
1. cd my-angular-seed
1. install Node.js if not already installed
1. enter "npm install" (takes a couple of minutes)
1. enter "npm install -g grunt-cli"
1. enter "grunt" to start a local server
1. browse "http://localhost:3000"
1. login with demouser/password
1. enter text and press the "Reverse" button
1. click the "Logout" link in the upper-right corner
1. click the language links at the bottom (affects all pages)
1. try an invalid user id or password
1. open a new terminal window
1. enter "grunt karma" to run unit tests
1. enter "grunt protractor" to run end-to-end UI tests
   (may get a timeout the first time if you
   wait too long to accept incoming connections)
