/*global angular: false */
(function () {
  'use strict';

  var app = angular.module('MySeed');

  app.factory('homeSvc', ['$http', '$q', '$state', '$timeout', 'rest',
    function ($http, $q, $state, $timeout, rest) {
      var svc = {};

      svc.reverseString = function (text) { // returns a promise
        /*
        // Simulate asynchronous operation and return a promise.
        var dfr = $q.defer();
        setTimeout(function () {
          var reverse = text.split('').reverse().join('');
          dfr.resolve({data: reverse});
        }, 100);
        return dfr.promise;
        */
        return $http.get('/reverse/' + text);
      };

      return svc;
    }
  ]);

  app.controller('HomeCtrl', ['$scope', 'homeSvc',
    function ($scope, homeSvc) {
      $scope.text = 'My Seed';

      $scope.reverseString = function () {
        homeSvc.reverseString($scope.text).then(
          function (res) {
            $scope.reversed = res.data;
          },
          function (err) {
            alert(err);
          }
        );
      };
    }
  ]);
})();
