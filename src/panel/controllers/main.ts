import { omit, zipObject } from "lodash";
import { fromJS } from "immutable";
import { app } from "../index";
import { resetState, setAppData, swapSolution, toggleApp } from "../actions";

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
}

const controller = (
  redux,
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
    const messages = $scope.t.status;

    /**
     * Run solver.start with contour and options, returns "main worker" Promise
     */
    const solverStart = (result: CEPResponse) => {
      return solver.start(<IFigure>result.data, options);
    };

    /**
     * When Solver finished
     */
    const solverDone = () => {
      redux.dispatch(toggleApp("on", messages.done));
    };

    /**
     * Errors handler from ILST
     */
    const errIlst = (err: CEPError) => {
      solver.stop();
    };

    /**
     * Errors handler from Solver
     */
    const errSolver = (err) => {
      redux.dispatch(toggleApp("on", err));
    };

    /**
     * Pass Solver result to ILST
     */
    const dispatchSolution = () => {
      const state = <IFlowState>redux.getState().flow;

      if (state._queue.length === 0) {
        return;
      }
      const solution = state._queue[0];

      const applySolution: CEPCommand = {
        data: solution,
        handler: "applySolution",
      };

      ILST.dispatch(applySolution).then(() => {
        redux.dispatch(swapSolution(solution));
        // Apply remaining or new solutions in _queue (if any)
        dispatchSolution();
      });
    };

    /**
     * Cleanup previous state, lock UI
     */
    redux.dispatch(resetState());
    redux.dispatch(toggleApp("off", messages.started));

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
    runner.then(solverDone, errSolver, dispatchSolution);
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

  /**
   * Mapping redux action to scope functions leads to lost signatures typings.
   * So, I prefer use `redux.dispatch(action)` instead `this.action` except
   * method called directly from directives.
   */
  const disconnect = redux.connect(mapStateToProps, {setAppData})($scope);

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
      redux.dispatch(setAppData(update));
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
      const state = redux.getState();
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
