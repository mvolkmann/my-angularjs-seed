// This defines a set of custom AngularJS filters.
(function () {
  var app = angular.module('MySeed');

  /**
   * This is an AngularJS filter that replaces all colons in a string
   * with hypens.  It is useful for forming valid HTML ids
   * from sysUser user names (login ids).
   * This may be in use at the moment.
   */
  app.filter('makeId', function () {
    return function (string) {
      return string.replace(/:/g, '-');
    };
  });
}());
