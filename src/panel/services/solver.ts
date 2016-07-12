import { app } from "../index";
import { pushSolution } from "../actions";
/**
 * Import predefined solutions
 */
import { solution as solution1 } from "./3075_eticetka.ai";

const service = (
  redux,
  $timeout: ng.ITimeoutService,
  $q: ng.IQService
  ): SolverSerivce => {
  /**
   * Service-level deferred object
   */
  let deferred: ng.IDeferred<ISolution>;

  let stopInProgress = false;

  /**
   * Send solution to upstream
   */
  const notify = (solution: ISolution) => {
    redux.dispatch(pushSolution(solution));
    deferred.notify(solution);
    if (stopInProgress) {
      throw new Error("Stop recieved");
    }
  };

  /**
   * Фейковая реализация Solver;
   *
   * Через произвольное время выдаём заранее известный результат
   */
  const start = (data, options): ng.IPromise<ISolution> => {
    deferred = $q.defer();
    const fn = notify.bind(this, solution1);
    stopInProgress = false;

    $timeout( fn, Math.random() * 10000 ).then(() => {
      return $timeout( fn, Math.random() * 10000 );
    }).then(() => {
      return $timeout( fn, Math.random() * 10000 );
    }).then(() => {
      return $timeout( fn, Math.random() * 10000 );
    }).then(() => {
      return $timeout( fn, Math.random() * 10000 );
    }).then(() => {
      return $timeout( fn, Math.random() * 10000 );
    }).then(() => {
      return $timeout( fn, Math.random() * 10000 );
    }).then(() => {
      return $timeout( fn, Math.random() * 10000 );
    }).then(() => {
      return $timeout( fn, Math.random() * 10000 );
    }).then(() => {
      return $timeout( fn, Math.random() * 10000 );
    }).then(() => {
      // Ctrl+V foreva, но промис нужно разрезолвить.
      deferred.resolve();
    }).finally(() => {
      console.info("Cleanup and exit here");
    });

    return deferred.promise;
  };

  const stop = (reason = "Aborted") => {
    if (deferred) {
      deferred.reject(reason);
    }
  };

  const staySync = () => {
    const state = <IFlowState>redux.getState().flow;
    if (deferred && !state.solverBusy) {
      stopInProgress = true;
      return stop();
    }
  };

  redux.subscribe(staySync);

  return {
    start,
    stop,
  };
};

/**
 * Отметимся в Ангуляре как сервис
 */
app.factory("Solver", ["$ngRedux", "$timeout", "$q", service]);
