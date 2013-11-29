'use strict';
/*global angular: false, beforeEach: false, describe: false,
  expect: false, inject: false, it: false,
  protractor: false, spyOn: false, xit: false */

var fs = require('fs');
var protractorSugar = require('./protractorSugar');

describe('home page', function () {
  var ps, ptor;

  beforeEach(function () {
    ptor = protractor.getInstance();
    ps = protractorSugar(ptor);
    ptor.get('/');
  });

  it('should reverse a string', function () {
    ps.setInputValue('userId', 'demouser');
    ps.setInputValue('password', 'password');
    ps.click('loginBtn');
    expect(ptor.getCurrentUrl()).toContain('#/home');

    ps.setInputValue('text', 'abcde');
    ps.click('reverseBtn');

    expect(ps.getText('reversed')).toBe('edcba');
  });
});
