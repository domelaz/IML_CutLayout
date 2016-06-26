import { omit, zipObject } from "lodash";
import { fromJS } from "immutable";
import { app } from "../index";
import { setAppData } from "../actions";

/**
 * Интерфейс $scope
 */
interface IMainScope extends ng.IScope, AppDataService {
  /**
   * Выполнить что-либо на стороне ILST
   */
  go(): void;

  /**
   * Dispatch app settings to Redux store
   */
  setAppData(data: AppDataService): void;

  /**
   * Dev stuff, doomed
   */
  debug: {
    createSolution(): void;
    inspect(): void;
    saveTask(): void;
    testSolution(): void;
  };

  flow: IFlowState;

  /**
   * App language
   */
  lang: string;

  /**
   * Shared options
   */
  opt: ICommonOptions;

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
  /**
   * Copy application state without useless params as options for Solver
   */
  function getopt(): ICommonOptions {
    const options = omit($scope.opt, [
      "material", "materials", "materialWidth", "printing",
    ]);

    /**
     * Normalize numeric options: convert `mm` to `pt`
     */
    const mmToPoint = 2.834645669;
    const metrics = [
      "materialHeight",
      "nonWorkingArea",
      "trimOffset",
      "widths",
    ];
    metrics.forEach(key => {
      const val = options[key];
      if (val.length) {
        options[key] = val.map( v => v * mmToPoint );
      } else {
        options[key] *= mmToPoint;
      }
    });

    return options;
  };

  /**
   * Run Solver loop
   */
  $scope.go = () => {
    const options = getopt();

    /**
     * Run solver.start with contour and options, returns "main worker" Promise
     */
    const solverStart = (result: CEPResponse) => {
      $scope.status = $scope.t.status.started;
      return solver.start(<IFigure>result.data, options);
    };

    /**
     * When Solver finished
     */
    const solverDone = () => {
      $scope.status = $scope.t.status.done;
    };

    /**
     * Errors handler from ILST
     */
    const errIlst = (err) => {
      solver.stop();
      $scope.status = $scope.t.status.fuckup + err;
    };

    /**
     * Errors handler from Solver
     */
    const errSolver = (err) => {
      $scope.status = $scope.t.status.solverFail  + err;
    };

    /**
     * Pass Solver result to ILST
     */
    const dispathSolution = (solution: ISolution) => {
      const applySolution: CEPCommand = {
        data: solution,
        handler: "applySolution",
      };

      $scope.status = $scope.t.status.applying;

      ILST.dispatch(applySolution).then(() => {
        if ($scope.status !== $scope.t.status.done) {
          $scope.status = $scope.t.status.next;
        }
      });
    };

    /**
     * This method on ILST side provides <IFigure> object
     */
    const getContour: CEPCommand = {
      handler: "getContour",
    };

    /**
     * Here we go! Get initial contour from ILST and pass it to Solver
     */
    const runner = ILST.dispatch(getContour).then(solverStart, errIlst);

    /**
     * Dispatch solutions coming from Solver into ILST
     * until Solver is done or user press Abort somehow
     */
    runner.then(solverDone, errSolver, dispathSolution);
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
    const props = { flow: state.flow, opt: state.settings.toJS() };
    return props;
  };

  const disconnect = $ngRedux.connect(mapStateToProps, {setAppData})($scope);

  $scope.$on("$destroy", disconnect);

  /**
   * Dispatch "scalar" (binded with just `ng-model`) changes to Redux store
   */
  const bindings = ["nonWorkingArea", "printing", "restrict", "trimOffset",
    "widths"];
  $scope.$watchGroup(bindings, (next) => {
    if (typeof(next) !== "undefined") {
      const update = zipObject(bindings, next);
      $scope.setAppData(update);
    }
  });

  /**
   * Cascade update
   *
   * Clone widths of selected material
   */
  $scope.$watch("opt.material", (next: IMaterials) => {
    if (next) {
      const update = {
        widths: next.width.slice(0, 1), // min width by default
      };
      $scope.setAppData(update);
    }
  }, true);

  /**
   * Debug
   */
  $scope.debug = {
    createSolution: () => {
      ILST.dispatch({ handler: "solution" });
    },

    inspect: () => {
      const state = $ngRedux.getState();
      console.log("State and scope", fromJS(state).toJS(), $scope);
    },

    saveTask: () => {
      const userSelection = window["cep"].fs.showSaveDialogEx("Save task");

      const fileName = userSelection.data;

      if (typeof(fileName) === "undefined") {
        return; // User hit Cancel
      }

      ILST.dispatch({handler: "getContour"}).then(result => {
        /**
         * @fixme Херовско станет, если сигнатура `solver.start` изменится
         */
        const data = [
          result.data,
          getopt(),
        ];

        const task = JSON.stringify(data, null, "  ");

        window["cep"].fs.writeFile(fileName, task);
      });
    },

    testSolution: () => {
      const userSelection = window["cep"].fs.showOpenDialogEx(
        false,
        false,
        "Select solution"
      );
      const fileName = userSelection.data[0];

      if (typeof(fileName) === "undefined") {
        return; // User hit Cancel
      }

      const solutionData = window["cep"].fs.readFile(fileName);

      try {
        const solution = JSON.parse(solutionData.data);
        ILST.dispatch({ data: solution, handler: "applySolution"});
      } catch (e) {
        $scope.status = "Not valid JSON";
      }
    },
  };
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
