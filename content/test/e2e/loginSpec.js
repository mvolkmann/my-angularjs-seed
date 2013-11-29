'use strict';
/*global angular: false, beforeEach: false, describe: false,
  expect: false, inject: false, it: false,
  protractor: false, spyOn: false, xit: false */

var fs = require('fs');
var protractorSugar = require('./protractorSugar');

describe('login', function () {
  var ps, ptor;

  beforeEach(function () {
    ptor = protractor.getInstance();
    ps = protractorSugar(ptor);
    ptor.get('/gm-ep/common/');

    //ptor.waitForAngular();
    //ptor.sleep(3000);

    //var dialog = ptor.switchTo().alert();
    //dialog.then(function () {
    //  console.log('loginSpec: in callback');
    //});
    //var text = dialog.getText();
    //console.log('loginSpec: text =', text);
    /*
    ptor.getWindowHandle().then(function (handle) {
      console.log('loginSpec: handle =', handle);
    });
    console.log('dialog =', dialog);
    */
    //dialog.cancel();
    //dialog.dismiss();
  });

  xit('should take screenshot', function () {
    ptor.takeScreenshot().then(function (data) {
      fs.writeFileSync('shot.png', data, 'base64');
    });
  });

  xit('should fail on bad username/password', function () {
    ps.setInputValue('userId', 'foo');
    ps.setInputValue('password', 'bar');
    ps.click('login');
    expect(ps.getText('loginError')).toBe(
      'The user id or password is incorrect.');
  });

  xit('should fail on locked out user', function () {
    //ps.setInputValue('userId', 'tid:000000');
    //ps.setInputValue('password', 'password01');
    ps.setInputValue('userId', 'lockedout');
    ps.setInputValue('password', 'something');
    ps.click('login');
    expect(ps.getText('loginError')).toBe(
      'User account is disabled. Please contact the help desk.');
  });

  /*
   * The password hint link has been removed.
   * This test is being retained for now just as an example.
  xit('should get password hint', function () {
    ps.setInputValue('userId', 'tid:000000');
    ps.click('passwordHintLink');
    expect(ps.getText('passwordHint')).toBe('qwerty');
  });
  */

  it('should go to profile page on expired password', function () {
    ps.setInputValue('userId', 'expiredPassword');
    ps.setInputValue('password', 'something');
    ps.click('login');
    expect(ptor.getCurrentUrl()).toContain('#/profile');
  });

  xit('should go to home page on success', function () {
    ps.setInputValue('userId', 'tid:000000');
    ps.setInputValue('password', 'password01');
    ps.click('login');
    expect(ptor.getCurrentUrl()).toContain('#/home');
  });

  xit('should redirect to password tab of profile page ' +
    'if any passwords are expired', function () {

    ps.setInputValue('userId', 'tid:000000');
    ps.setInputValue('password', 'password01');
    ps.click('login');
    expect(ptor.getCurrentUrl()).toContain('#/profile');

    sessionStorage.passwordChangeRequired = false;
  });
});
