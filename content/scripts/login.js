/*global angular: false */
(function () {
  'use strict';

  var app = angular.module('Evolution');

  app.factory('loginSvc', ['$http', 'rest',
    function ($http, rest) {
      var svc = {};

      svc.authenticate = function (username, password) {
        var url = rest.getRestUrlPrefix() + 'user/authenticate';
        var data = {
          username: username,
          password: password
        };
        var options = {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        };
        return $http.post(url, $.param(data), options);
      };

      svc.getPasswordHint = function (username) {
        var url = rest.getRestUrlPrefix() +
          'user/password-hint?userName=' + username;
        return $http.get(url);
      };

      return svc;
    }
  ]);

  app.controller('LoginCtrl', ['$scope', '$state', '$http',
    'domUtil', 'httpUtil', 'loginSvc',
    function ($scope, $state, $http, domUtil, httpUtil, loginSvc) {
      $scope.today = new Date(); // just for testing i18n

      $('#userId').focus();

      $scope.goHome = function () {
        if (sessionStorage.passwordChangeRequired) {
          alert('Password changes must be completed.');
        } else {
          $state.go('home');
        }
      };

      $scope.emailPassword = function () {
        alert('Emailing passwords is not implemented yet.');
      };

      $scope.getFirstName = function () {
        return sessionStorage.userFirstName;
      };

      $scope.getLastName = function () {
        return sessionStorage.userLastName;
      };

      $scope.login = function (event) {
        var userId = $scope.userId;
        var password = $scope.password;

        loginSvc.authenticate(userId, password).then(
          function (res) {
            var data = res.data;
            if (data.locked) {
              $scope.loginError =
                'User account is disabled.  Please contact the help desk.';
            } else {
              sessionStorage.setItem('token', data.token);
              $http.defaults.headers.common['Auth-Token'] =
                sessionStorage.token;
              sessionStorage.setItem('userId', userId);

              sessionStorage.userFirstName = data.firstName;
              sessionStorage.userLastName = data.lastName;

              // sessionStorage values must be strings.
              var changePassword = data.loginEvents &&
                data.loginEvents.indexOf('CHANGE_PW') !== -1;
              sessionStorage.passwordChangeRequired =
                changePassword ? 'true' : '';
              var to = changePassword ? 'profile' : 'home';
              var toParams = {};
              var options = {inherit: false}; // don't retain query parameters
              $state.go(to, toParams, options);
            }
          },
          function (err) {
            $scope.loginError = 'The user id or password is incorrect.';
          });
      };

      $scope.logout = function (event) {
        event.preventDefault();
        $state.go('login');
      };

      $scope.showPasswordHint = function (event) {
        event.preventDefault();
        var userId = $scope.userId;
        loginSvc.getPasswordHint(userId).then(
          function (res) {
            $scope.passwordHint = res.data;
          },
          function (err) {
            $scope.passwordHint = err;
          });
      };

      $scope.showTooltip = function (event) {
        $(event.target).tooltip('show');
      };

      // Check for query parameters.
      // TODO: Change to pass k & d parameters to a different REST service.
      var userId = httpUtil.getQueryParam('userId');
      var password = httpUtil.getQueryParam('password');
      if (userId && password) {
        $scope.userId = userId;
        $scope.password = password;
        return $scope.login();
      } else {
        //$scope.userId = 'tid:000000'; // for testing
        $scope.userId = 'demouser'; // for testing
        $scope.password = 'password'; // for testing
      }
    }]);
})();
