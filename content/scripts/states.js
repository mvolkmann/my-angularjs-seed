/*global angular: false */
(function () {
  'use strict';

  var app = angular.module('MySeed');

  function getLocaleLang() {
    var localeLang = navigator.language || navigator.userLanguage;
    if (localeLang) localeLang = localeLang.split('-')[0];
    return localeLang;
  }

  // The properties of this object can be injected into HomeCtrl.
  // The value of each property is a function that returns a promise.
  // The resolved values of these promises are the injected values.
  // This associated view will not render until
  // the promise for each property is resolved.
  var profileResolve = {
    user: ['userSvc',
      function (userSvc) {
        return userSvc.getUser();
      }
    ]
  };

  app.config(['$stateProvider', '$urlRouterProvider',
    function ($stateProvider, $urlRouterProvider) {
      $urlRouterProvider.otherwise('/lang/' + getLocaleLang());

      $stateProvider
        .state('lang', {
          url: '/lang/:lang',
          controller: 'MainCtrl'
        })
        .state('login', {
          url: '/login',
          controller: 'LoginCtrl',
          templateUrl: 'partials/login.html',
          onEnter: function () {
            // Not using "delete sessionStorage.{key}"
            // because that gives an error in IE8
            // if the key doesn't exist.
            sessionStorage.removeItem('userFirstName');
            sessionStorage.removeItem('userLastName');
          }
        })
        .state('login-help', {
          url: '/login-help',
          templateUrl: 'partials/login-help.html'
        })
        .state('home', {
          url: '/home',
          controller: 'HomeCtrl',
          templateUrl: 'partials/home.html'
        })
        .state('profile', {
          url: '/profile',
          controller: 'ProfileCtrl',
          resolve: profileResolve,
          templateUrl: 'partials/profile.html'
        });
    }
  ]);

  // This is useful for debugging the use of ui-router states.
  // Just inject it into some controller to enable it.
  app.factory('stateSvc', function ($rootScope) {
    $rootScope.$on('$stateChangeStart',
      function (event, toState, toParams, fromState, fromParams) {
        console.log('changing state from', fromState.name, 'to', toState.name);
      });
    $rootScope.$on('$stateChangeSuccess',
      function (event, toState, toParams, fromState, fromParams) {
        console.log('changed state from', fromState.name, 'to', toState.name);
      });
    $rootScope.$on('$stateChangeError',
      function (event, toState, toParams, fromState, fromParams, error) {
        console.log('error', error,
          'changed state from', fromState.name, 'to', toState.name);
      });
    $rootScope.$on('$stateNotFound',
      function (unfoundState) {
        console.log('tried to change to state', unfoundState.to,
          'but that state is not defined');
      });
  });
})();
