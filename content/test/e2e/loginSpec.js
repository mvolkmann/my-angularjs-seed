'use strict';
/*global angular: false, beforeEach: false, describe: false,
  expect: false, inject: false, it: false,
  protractor: false, spyOn: false, xit: false */

var fs = require('fs');
var protractorSugar = require('./protractorSugar');

describe('login page', function () {
  var ps, ptor;

  beforeEach(function () {
    ptor = protractor.getInstance();
    ps = protractorSugar(ptor);
    ptor.get('/');
  });

  xit('should take screenshot', function () {
    ptor.takeScreenshot().then(function (data) {
      fs.writeFileSync('shot.png', data, 'base64');
    });
  });

  it('should fail on bad username/password', function () {
    ps.setInputValue('userId', 'foo');
    ps.setInputValue('password', 'bar');
    ps.click('loginBtn');
    expect(ps.getText('loginError')).toBe(
      'The user id or password is incorrect.');
  });

  xit('should fail on locked out user', function () {
    ps.setInputValue('userId', 'lockedout');
    ps.setInputValue('password', 'something');
    ps.click('loginBtn');
    expect(ps.getText('loginError')).toBe(
      'User account is disabled. Please contact the help desk.');
  });

  xit('should go to profile page on expired password', function () {
    ps.setInputValue('userId', 'expiredPassword');
    ps.setInputValue('password', 'something');
    ps.click('loginBtn');
    expect(ptor.getCurrentUrl()).toContain('#/profile');
  });

  it('should go to home page on success', function () {
    ps.setInputValue('userId', 'demouser');
    ps.setInputValue('password', 'password');
    ps.click('loginBtn');
    expect(ptor.getCurrentUrl()).toContain('#/home');
  });

  xit('should redirect to password tab of profile page ' +
    'if any passwords are expired', function () {

    ps.setInputValue('userId', 'expiredUser');
    ps.setInputValue('password', 'password01');
    ps.click('loginBtn');
    expect(ptor.getCurrentUrl()).toContain('#/profile');

    sessionStorage.passwordChangeRequired = false;
  });
});
