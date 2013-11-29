(function () {
  var app = angular.module('MySeed');

  app.factory('translate', function () {
    return function (original) {
      var translation = app.translations[original];
      return translation ? translation : original;
    };
  });

  // The name of this filter is the abbreviation for "Localization".
  // The first letter is uppercase to help distinguish from "i18n"
  // which is the abbreviation for "internationalization".
  app.filter('L10n', ['translate', function (translate) {
    return function (original) {
      if (!app.translations) {
        // This occurs when the user refreshes a page.
        // Get translations from sessionStorage.
        app.translations = JSON.parse(sessionStorage.translations);
      }

      return translate(original);
    };
  }]);
}());
