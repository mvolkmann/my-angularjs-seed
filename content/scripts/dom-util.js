/*global angular: false */
(function () {
  var app = angular.module('MySeed');

  app.factory('domUtil', function () {
    var svc = {};

    svc.setCursor = function (cursor, elem) {
      if (elem) elem.style.cursor = cursor;
      document.body.style.cursor = cursor;
    };

    return svc;
  });
})();
