/*global angular: false */
// This is from https://github.com/lgalfaso/angular-dynamic-locale.
// It was modified slightly to conform to JSHint.
(function () {
  'use strict';

  var mod = angular.module('tmh.dynamicLocale', []);

  mod.provider('tmhDynamicLocale', function () {
    var localeLocationPattern = 'angular/i18n/angular-locale_{{locale}}.js';

    /**
     * Loads a script asynchronously
     *
     * @param {string} url The url for the script
     * @param {function) callback called once the script is loaded
     */
    function loadScript(url, callback) {
      var script = document.createElement('script'),
        head = document.getElementsByTagName('head')[0];

      script.type = 'text/javascript';
      if (script.readyState) { // IE
        script.onreadystatechange = function () {
          if (script.readyState === 'loaded' ||
              script.readyState === 'complete') {
            script.onreadystatechange = null;
            callback();
          }
        };
      } else { // Others
        script.onload = function () {
          callback();
        };
      }
      script.src = url;
      script.async = false;
      head.insertBefore(script, head.firstChild);
    }

    /**
     * Loads a locale and replaces the properties from
     * the current locale with the new locale information.
     *
     * @param localeUrl The path to the new locale
     * @param $locale The locale at the curent scope
     */
    function loadLocale(localeUrl, $locale, localeId, $rootScope, localeCache) {

      function overrideValues(oldObject, newObject) {
        angular.forEach(newObject, function (value, key) {
          if (angular.isArray(newObject[key]) ||
              angular.isObject(newObject[key])) {
            overrideValues(oldObject[key], newObject[key]);
          } else { 
            oldObject[key] = newObject[key];
          } 
        });
      } 

      var cachedLocale = localeCache.get(localeId);
      if (cachedLocale) {
        $rootScope.$evalAsync(function () {
          overrideValues($locale, cachedLocale);
          $rootScope.$broadcast('$localeChangeSuccess', localeId, $locale);
        });
      } else {
        loadScript(localeUrl, function () {
          // Create a new injector with the new locale
          var localInjector = angular.injector(['ngLocale']),
            externalLocale = localInjector.get('$locale');

          overrideValues($locale, externalLocale);
          localeCache.put(localeId, externalLocale);

          $rootScope.$broadcast('$localeChangeSuccess', localeId, $locale);
          $rootScope.$apply();
        });
      }
    }

    this.localeLocationPattern = function (value) {
      if (value) {
        localeLocationPattern = value;
        return this;
      } else {
        return localeLocationPattern;
      }
    };

    this.$get = ['$rootScope', '$interpolate',
      '$locale', 'tmhDynamicLocaleCache',
      function ($rootScope, interpolate, locale, tmhDynamicLocaleCache) {

      var localeLocation = interpolate(localeLocationPattern);

      return {
        /**
         * @ngdoc method
         * @description
         * @param {string=} value Sets locale to new locale. Changing locale
         *   will trigger a background task that will retrieve new locale and
         *   configure current $locale instance with information from new locale
         */
        set: function (value) {
          loadLocale(localeLocation({locale: value}),
            locale, value, $rootScope, tmhDynamicLocaleCache);
        }
      };
    }];

  });
  
  mod.provider('tmhDynamicLocaleCache', function () {
    this.$get = ['$cacheFactory', function ($cacheFactory) {
      return $cacheFactory('tmh.dynamicLocales');
    }];
  });
})();
