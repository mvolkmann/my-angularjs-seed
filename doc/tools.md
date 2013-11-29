# Tools

The tools used in this project are documented below
in alphabetical order.

## AngularJS

This is a Web framework that focuses on single-page applications (SPAs).
Mark Volkmann gave a presentation on this at the August 2013 OCI Tech Lunch.
The slides provide a good introduction and can be found at
<http://ociweb.com/mark/other-presentations/AngularJS.pdf>.
Also see <http://angularjs.org>.

Unit tests for AngularJS can be implemented using Karma and Jasmine.
End-to-End tests for AngularJS applications can be implemented using Protractor, Selenium and Jasmine.
Slides that describe these tools and include example tests can be found at
<http://ociweb.com/mark/other-presentations/AngularJS-Testing.pdf>.

## Fiddler

This is a tool for capturing HTTP traffic.
It can be downloaded from http://fiddler2.com.
Chrome Developer Tools does this too.
However, this is needed for IE testing.
It may be necessary to change the proxy settings in IE to get Fiddler to work.
Select Tools...Internet Options...Connections...LAN Settings.
Uncheck "Automatically detect settings".
Check "Use a proxy server ...".
Press the "Advanced" button.
For both HTTP and Secure, enter 127.0.0.1 for the address and 8888 for the port.
Press OK.
Check "Bypass proxy server for local addresses".
When browsing localhost sites, add a period after localhost.

To clear the sessions (HTTP request) displayed by Fiddler, press ctrl x.

## Git

This is our version control tool.
For documentation, see <http://git-scm.com>.

## Grunt

This tool automates many common Web development tasks.
It runs on Node.js, so that must be installed first.
Mark Volkmann gave a presentation on this at the June 2013 meeting
of the St. Louis JavaScript meetup.
The slides provide a good introduction and can be found at
<http://ociweb.com/mark/STLJS/Grunt.pdf>.
Also see <http://gruntjs.com>.

To install Grunt:

* `npm install -g grunt-cli`
    - This installs the command-line interface in a way that can be used by any project.
* cd to the directory of a specific project
    - Create a directory named "node_modules" in this directory.
* `npm init`
    - This creates a package.json file for the project.
* `npm install grunt --save-dev`
    - This installs the latest version of Grunt in the node_modules directory
      and records this as a development dependency of the project in package.json.

Grunt uses plugins for each of its tasks.
These plugins are documented at <http://gruntjs.com/plugins>.
Commonly used, and recommended plugins include:

* grunt-contrib-clean
    - deletes specified directories
      (ex. a "build" directory where generated files are placed)
* grunt-contrib-connect
    - runs a local HTTP server for serving static files (useful while testing)
* grunt-contrib-cssmin
    - concatenates and minimizes a set of CSS files to reduce download time
* grunt-contrib-jshint
    - checks JavaScript files for errors and style deviations
* grunt-contrib-watch
    - watches a set of files for changes and runs given tasks when they change
* grunt-contrib-uglify
    - concatenates and minimizes a set of JavaScript files to reduce download time
      and obfuscate the code to make it a bit more secure
* grunt-karma
    - runs automated tests in a set of configured Web browsers
    - supports DOM and AngularJS tests
* grunt-less
    - creates .css files from .less files (see description of LESS below)

Install the plugin for each task needed by the project.

To install a Grunt plugin:

* `npm install {plugin-name} --save-dev`

To configure Grunt, create the file Gruntfile.js
in the top directory of the project.
This file loads and configures the plugins that
implement the tasks that are needed by the project.
For details on how to write the code in this file,
see the slide presentation mentioned earlier.

## Internet Explorer 8

This tool will be the bane of your existence,
but we have to support users that use this browser.
The F12 Developer Tools IE provides are inferior
to the corresponding tools in Chrome and Firefox.
It is recommended that you do the majority of your testing
during development using Google Chrome,
but periodically test in IE8 to verify correct behavior.

To force IE to reload files from the server, press ctrl F5.

When testing in IE, use Fiddler to capture HTTP traffic
for debugging purposes.

IE8 can have an issue where files are cached refreshing a page
will not download the files again
even if they have been modified on the server.
This may only affect intranet pages.
To prevent this problem ...

On the Tools menu:
1) "Compatibility View" should not be checked.
2) In the "Compatibility View Settings" dialog,
   only "Display intranet sites in Compatibility View" can be checked
   and even that probably should not be checked.
3) In the "Internet Options" dialog,
   click the "Settings" button under "Browser history".
   Developers should select "Every time I visit the webpage"
   rather than "Automatically".

## JSHint

This tool checks JavaScript files for errors and style deviations.
See <http://jshint.com>.
The checks it performs can be customized through a configuration file
that is typically stored in the user home directory named .jshintrc.
It can also be configured on a per-file basis with `/*jshint ... */` comments.
The eP3 client git repo contains the file "jshintrc" in the top directory
that is being used by that project.

## Karma

This tool runs unit tests in real Web browsers and
in PhantomJS, a headless (no UI) testing environment.
It was created by the team that maintains AngularJS.
It is not a test library.  A test library such as
Jasmine or Mocha must be selected.

For more information, see
<http://karma-runner.github.io/0.10/index.html>
and
<http://ociweb.com/mark/other-presentations/AngularJS-Testing.pdf>.

## LESS

This is a dialect of CSS that supports variables, mixins, nested rules, and more.
The "less" tool creates .css files from .less files.
This tool can be run from the command-line or from Grunt.
See <http://lesscss.org>.

To install LESS so it can be run from the command-line:

* `npm install -g less`

To run LESS from the command-line:

* `lessc {name}.less {name}.css`

It is recommended that this tool be run from Grunt.
Grunt can be configured to look for changes to
any .less files under a given directory (perhaps named "less")
and create .css under another directory (perhaps named "styles").

## Markdown

This is a markup syntax used for this documentation.
For details, see <http://daringfireball.net/projects/markdown>.

## Node.js

This is a JavaScript-based programming environment
based on the Google Chrome V8 JavaScript engine.
It supports server-side (non-browser) JavaScript applications.
See <http://nodejs.org>.

Mark Volkmann gave a presentation on this at CAIT in June 2013.
The slides provide a good introduction and can be found at
<http://ociweb.com/mark/other-presentations/CAIT-Node.pdf>.

To install Node.js:

* browse <http://nodejs.org>
* press the large "INSTALL" button
* run the downloaded installer
* open a Command Prompt window and enter `node -v`
  to verify that it was installed properly

## Pandoc

This tool converts files from one markup syntax to another.
It is used by this project to convert Markdown files to HTML.
To install this, browse <http://johnmacfarlane.net/pandoc>
and click the "Installing" link in the left nav.
To convert a .md file to a .html file, enter
`pandoc {name}.md -o {name}.html`.

## Protractor

This is a test runner based on Selenium WebDriverJS.
It runs end-to-end tests in real Web browsers and can also
run in PhantomJS, a headless browser testing environment.
It is designed for use with AngularJS applications,
but is not restricted to those.
It supports use of the Jasmine and Mocha test frameworks.
It does not depend on or use Karma.

For more information, see
<https://github.com/angular/protractor>
and
<http://ociweb.com/mark/other-presentations/AngularJS-Testing.pdf>.

## Twitter Bootstrap

This provides responsive CSS styling and HTML widgets for Web applications.
See <http://getbootstrap.com>.

## Uglify

This concatenates and minifies JavaScript files.
There is a Grunt plugin for this and that is the recommended way to run it.
See <https://github.com/mishoo/UglifyJS>.
