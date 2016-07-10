import "jquery";
import "angular";
import "angular-local-storage";
import "ng-redux";

import rootReducer from "./reducers";

const app = angular.module("iml", ["LocalStorageModule", "ngRedux"]);

import "./middleware";

app.config([
  "localStorageServiceProvider",
  "$ngReduxProvider",
  (localStorageServiceProvider, $ngReduxProvider) => {
    localStorageServiceProvider.setPrefix("iml");
    const middlewares = ["loggerMiddleware"];
    $ngReduxProvider.createStoreWith(rootReducer, middlewares);
}]);

/**
 * Init application settings at startup
 */
app.run([ "AppData", (appdata) => { } ]);

/**
 * После того, как модуль создан, можно заявлять "наши" компоненты.
 */
import "./services";
import "./controllers";
import "./directives";
import "./i18n";

export {
  app,
}
