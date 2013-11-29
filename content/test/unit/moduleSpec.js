'use strict';
/*global angular: false, describe: false, expect: false, it: false */

describe('main module', function () {
  var module = angular.module('Evolution');

  it('exists', function () {
    expect(module).not.toBeNull();
  });

  it('has correct dependencies', function () {
    expect(module.requires.length).toBe(3);
    expect(module.requires).toContain('ngRoute');
    expect(module.requires).toContain('CustomDirectives');
    expect(module.requires).toContain('tmh.dynamicLocale');
  });
});
