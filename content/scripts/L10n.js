(function () {
  var app = angular.module('Evolution');

  // The name of this filter is the abbreviation for "Localization".
  // The first letter is uppercase to help distinguish from "i18n"
  // which is the abbreviation for "internationalization".
  app.filter('L10n', function () {
    return function (original) {
      if (!app.translations) {
        // This occurs when the user refreshes a page.
        // Get translations from sessionStorage.
        app.translations = JSON.parse(sessionStorage.translations);
      }

      var translation = app.translations[original];

      return translation ? translation : original;
    };
  });
}());
