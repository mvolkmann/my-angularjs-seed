(function () {
  var browser = BrowserDetect.browser;
  var version = BrowserDetect.version;
  var os = BrowserDetect.OS;
  //console.log('You are running', browser, version, 'on', os);
  if (/PhantomJS/.test(navigator.userAgent)) browser = 'PhantomJS';

  // TODO: Update the list of supported browsers to include mobile browsers.
  var supported =
    browser === 'Chrome' ||
    browser === 'Firefox' ||
    browser === 'PhantomJS' ||
    (browser === 'Explorer' && version >= 9);
  if (supported) return;

  //console.log('is Explorer?', browser === 'Explorer');
  //console.log('is old?', version <= 8);

  var msg;

  if (browser === 'Explorer') {
    if (version < 8) {
      msg = 'This site may not function properly because ' +
        'you are using an unsupported Web browser.  ' +
        'Consider installing Chrome, Firefox, or a newer version of IE.';
    } else {
      msg = 'Consider upgrading to IE version 9 or higher.';
    }
  } else {
    msg = 'This site may not function properly because ' +
      'you are using an unsupported Web browser.  ' +
      'Consider installing Chrome or Firefox.';
  }

  // The next line breaks the Protractor tests when run in IE.
  alert(msg);
  //setTimeout(function () { alert(msg); }, 2000);
}());
