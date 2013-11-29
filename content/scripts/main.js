/*global angular: false */
(function () {
  'use strict';

  var app = angular.module('MySeed', [
    'CustomDirectives',
    'tmh.dynamicLocale',
    'ui.router'
  ]);

  // The only purpose of this controller is to
  // load language translation strings
  // and redirect to the login page.
  app.controller('MainCtrl', ['$http', '$location', '$rootScope',
    '$state', '$stateParams', 'tmhDynamicLocale', 'stateSvc',
    function ($http, $location, $rootScope,
      $state, $stateParams, tmhDynamicLocale, stateSvc) {

      var lang = $rootScope.lang = sessionStorage.lang = $stateParams.lang;
      tmhDynamicLocale.set(lang);

      // Load translation object from JSON file.
      var url = 'L10n/' + lang + '.json';
      var config = {
        ContentType: 'application/json'
      };
      $http.get(url, config).then(
        function (res) {
          // Save translations in sessionStorage to support page refreshes.
          sessionStorage.translations = JSON.stringify(res.data);
          app.translations = res.data;
          $state.go('login');
        },
        function (err) {
          alert('Failed to load language translations for "' + lang + '".');
        });
    }
  ]);

  // Note that services like $http
  // cannot be injected into the config function.
  app.run(['$http', '$rootScope',
    function ($http, $rootScope) {
      // In case a page refresh has occurred,
      // reset the Auth-Token header for REST calls.
      $http.defaults.headers.common['Auth-Token'] = sessionStorage.token;

      // In case a page refresh has occurred,
      // reset the display language (English, French, ...).
      $rootScope.lang = sessionStorage.lang;
    }
  ]);
})();
