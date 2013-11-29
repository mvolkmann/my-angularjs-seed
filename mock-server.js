'use strict';

/**
 * This simple HTTP server forwards all but selected requests
 * to the normal Tomcat server for eP3.
 * Specific requests are intercepted and
 * return canned data to support tests.
 */

var express = require('express');
var request = require('request');
var qs = require('querystring');
var app = express();

// This causes JSON response bodies to automatically be parsed
// into JavaScript objects so the value of res.body will be
// a JavaScript object instead of a string of JSON.
app.use(express.bodyParser());

// This demonstrates implementating a simple REST service
// in Node.js using Express.
app.get('/reverse/:text', function (req, res) {
  var text = req.params.text;
  var reverse = text.split('').reverse().join('');
  res.send(reverse);
});

// This is a mock version of the authenticate REST service.
app.post('/rest/user/authenticate', function (req, res, next) {
  if (req.body.username === 'demouser') {
    var user = {
      firstName: 'Eric',
      lastName: 'Nelson'
    };
    res.contentType('application/json');
    res.send(JSON.stringify(user));
  } else {
    next();
  }
});

app.all('*', function (req, res) {
  // Build the proper URL to forward this request to the Tomcat server.
  var url = req.url;
  //console.log('mock-server: in url =', url);
  var parts = url.split('/');
  var port = parts[1] === 'rest' ? 8080 : 3000;
  url = 'http://localhost:' + port + url;
  //console.log('mock-server: out url =', url);

  // Build the options for the Node "request" module.
  var options = {
    headers: req.headers,
    method: req.method,
    url: url
  };

  if (options.headers['auth-token'] === 'undefined') {
    delete options.headers['auth-token'];
  }

  // Build the body of the request.
  if (req.body) {
    var contentType = req.headers['content-type'];
    var isFormData =
      contentType === 'application/x-www-form-urlencoded';
    var isJSON =
      contentType === 'application/json';
    options.body = isFormData ? qs.stringify(req.body) :
      isJSON ? JSON.stringify(req.body) :
      req.body.toString();
  }

  //console.log('options =', options);

  // Send the request to the Tomcat server
  // and send the results to the response object.

  function handler(err, otherRes, body) {
    if (err) {
      var msg = err.code === 'ECONNREFUSED' ?
        'Tomcat server not running' : err.toString();
      res.status(500).end(msg);
    }
  }
  request(options, handler).pipe(res);
});

var PORT = 3019;
app.listen(PORT);
console.log('listening on', PORT);
