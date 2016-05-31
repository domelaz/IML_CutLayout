import { app } from "../index";
import { setAppData } from "../actions";

/**
 * Интерфейс $scope
 */
interface IMainScope extends ng.IScope, AppDataService {
  /**
   * Simple binding with Redux store
   */
  change(data: string): void;

  /**
   * Выполнить что-либо на стороне ILST
   */
  go(): void;

  /**
   * Dispatch app settings to Redux store
   */
  setAppData(data: AppDataService): void;

  /**
   * App language
   */
  lang: string;

  /**
   * Localization strings
   */
  t: ILocalizations;

  /**
   * Результат ILST действия
   */
  status: string;
}

const controller = (
  $ngRedux,
  $scope: IMainScope,
  strings,
  ILST: ILSTService,
  solver: SolverSerivce
  ) => {
  $scope.go = () => {
    /**
     * Покажем фидбек Марине, что процесс пошел
     */
    $scope.status = $scope.t.status.started;

    const getContour: CEPCommand = {
      handler: "getContour",
    };

    /**
     * Запрашиваем из ILST характеристики контура,
     * подмешиваем к ним параметры из UI,
     * передаем коктейль в solver,
     */
    ILST.dispatch(getContour).then(result => {
      return solver.solve(result.data);
    }).then(ready => {
      $scope.status = $scope.t.status.done;
    }, err => {
      $scope.status = $scope.t.status.solverFail  + err;
    }, notify => {
      const applySolution: CEPCommand = {
        data: notify,
        handler: "applySolution",
      };
      $scope.status = $scope.t.status.applying;
      ILST.dispatch(applySolution).then(() => {
        if ($scope.status !== $scope.t.status.done) {
          $scope.status = $scope.t.status.next;
        }
      });
    }).catch(err => {
      $scope.status = $scope.t.status.fuckup + err;
    });
  };

  /**
   * Localization strings
   * From state, from browser or Russian by default
   */
  const lang = $scope.lang || strings[navigator.language] || strings["ru"];
  $scope.t = lang;

  /**
   * Отражение свойств state на $scope
   */
  const mapStateToProps = (state: IRootReducer) => {
    return state.ui;
  };

  const disconnect = $ngRedux.connect(mapStateToProps, {setAppData})($scope);

  $scope.$on("$destroy", disconnect);

  /**
   * Dispatch changes to Redux store
   *
   * Good old function style: we need `this` context as child controller scope
   */
  $scope.change = function(key) {
    if (typeof(key) === "undefined") {
      return;
    }
    const update = {[key]: this[key]};
    $scope.setAppData(update);
  };

  /**
   * Cascade update
   *
   * Clone widths of selected material
   */
  $scope.$watch("material", (next: IMaterials) => {
    if (next) {
      const update = {
        widths: next.width.slice(0, 1), // min width by default
      };
      $scope.setAppData(update);
    }
  }, true);
};

/**
 * Отметимся в Ангуляре как контроллер
 */
app.controller("ctrlMain", [
  "$ngRedux",
  "$scope",
  "Strings",
  "ILST",
  "Solver",
  controller,
]);
