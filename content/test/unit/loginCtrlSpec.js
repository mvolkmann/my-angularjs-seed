'use strict';
/*global afterEach: false, beforeEach: false, describe: false,
  expect: false, inject: false, it: false */

describe('loginCtrl', function () {
  var scope, httpBackend;

  beforeEach(function () {
    module('MySeed');

    inject(function ($controller, $httpBackend, $rootScope) {
      // Create a scope and assign it to the controller.
      scope = $rootScope.$new();
      $controller('HomeCtrl', {$scope: scope});

      // Prepare mock responses to HTTP requests that will be made by services.
      httpBackend = $httpBackend;
      httpBackend.whenGET('/reverse/abcde').respond('edcba');
    });
  });

  afterEach(function () {
    httpBackend.verifyNoOutstandingExpectation();
    httpBackend.verifyNoOutstandingRequest();
  });

  it('should reverse string', function () {
    scope.text = 'abcde';
    scope.reverseString();
    httpBackend.flush();
    expect(scope.reversed).toBe('edcba');
  });
});
