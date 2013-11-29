/*global angular: false */
(function () {
  'use strict';

  var app = angular.module('Evolution');

  app.factory('homeSvc', ['$http', '$q', '$state', '$timeout', 'rest',
    function ($http, $q, $state, $timeout, rest) {
      var svc = {};

      svc.reverseString = function (text) {
        /*
        var url = rest.getRestUrlPrefix() +
          'reverse?text=' + text;
        return $http.get(url);
        */
        return text.split('').reverse().join('');
      };

      return svc;
    }
  ]);

  app.controller('HomeCtrl', ['$scope', 'homeSvc', function ($scope, homeSvc) {
    $scope.text = 'Biomerieux Evolution';

    $scope.reverseString = function () {
      $scope.reversed = homeSvc.reverseString($scope.text);
    };
  }]);
})();
