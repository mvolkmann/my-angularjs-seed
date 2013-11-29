'use strict';
/*global AsyncSpec: false, afterEach: false, angular: false, beforeEach: false,
   describe: false, expect: false, inject: false, it: false */

describe('loginSvc', function () {
  var svc;
  var restUrl = 'rest/login/password-hint?userId=mark';
  var $httpBackend;

  beforeEach(module('Evolution'));

  beforeEach(inject(function ($injector) {
    $httpBackend = $injector.get('$httpBackend');

    // Prepare mock responses to HTTP requests.
    $httpBackend.whenGET(restUrl).respond('take a guess');
  }));

  afterEach(function () {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

  it('should exist', inject(function ($injector) {
    svc = $injector.get('loginSvc');
    expect(svc).not.toBeNull();
  }));

  it('should get password hint', function () {
    var userId = 'mark'; //'tid:000000';
    svc.getPasswordHint(userId).then(
      function (res) {
        console.log('loginSvcSpec: res =', res);
        expect(res.data).toBe('take a guesstimate');
        $httpBackend.flush();
      },
      function (err) {
        console.log('loginSvcSpec: err =', err);
        expect(err).toBeUndefined();
        $httpBackend.flush();
      });
  });
});
