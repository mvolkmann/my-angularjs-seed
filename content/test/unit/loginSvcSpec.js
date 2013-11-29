'use strict';
/*global beforeEach: false, describe: false, expect: false,
  inject: false, it: false */

describe('loginSvc', function () {
  beforeEach(module('MySeed'));

  it('should exist', inject(function ($injector) {
    var svc = $injector.get('homeSvc');
    expect(svc).not.toBeNull();
  }));
});
