/*global angular: false */
(function () {
  var app = angular.module('MySeed');

  app.factory('epInterceptor', ['$q', 'domUtil',
    function ($q, domUtil) {
      var pendingCount = 0;
      var svc = {};

      function decrement() {
        pendingCount--;
        //console.log('pendingCount =', pendingCount);
        if (!pendingCount) {
          //console.log('reset cursor');
          domUtil.setCursor('auto');
        }
      }

      svc.request = function (config) {
        //console.log('interceptor got a request');
        if (!pendingCount) {
          //console.log('use wait cursor');
          domUtil.setCursor('wait');
        }
        pendingCount++;
        //console.log('pendingCount =', pendingCount);
        return config || $q.when(config);
      };

      svc.requestError = function (rejection) {
        //console.log('interceptor got a request error');
        decrement();
        return $q.reject(rejection);
      };

      svc.response = function (response) {
        //console.log('interceptor got a response');
        decrement();
        return response || $q.when(response);
      };

      svc.responseError = function (rejection) {
        //console.log('interceptor got a response error');
        decrement();
        return $q.reject(rejection);
      };

      return svc;
    }
  ]);

  app.config(['$httpProvider',
    function ($httpProvider) {
      $httpProvider.interceptors.push('epInterceptor');
    }
  ]);

  app.factory('httpUtil', function () {
    var svc = {};

    svc.getQueryParam = function (name) {
      var match = RegExp('[?&]' + name + '=([^&]*)').
      exec(window.location.search);
      return match && decodeURIComponent(match[1].replace(/\+/g, ' '));
    };

    return svc;
  });

  app.factory('rest', ['$rootScope',
    function ($rootScope) {
      var svc = {};

      svc.getRestUrlPrefix = function () {
        return '/rest/';
      };

      return svc;
    }
  ]);
})();
