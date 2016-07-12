import { app } from "../index";
import { actions as a } from "../constants";
import { cepError, cepHandle, cepRunning } from "../actions";

const middleware = (
  $q: ng.IQService,
  cs: CSInterface.CSInterfaceInstance,
  config: ICommonConfig) => {
  return store => next => action => {
    if (action.type !== a.CEP_ASYNC) {
      return next(action);
    }

    const command = <CEPCommand>action.payload;
    const state = <IRootReducer>store.getState();

    if (state.flow.ilstBusy) {
      const reason = "subsystem locked";
      console.warn(command.handler, reason);
      store.dispatch(cepError({
        error: { message: reason },
        handler: command.handler,
      }));
      return $q.reject(reason);
    }

    const deferred = $q.defer();
    const executor = `${config.connector}(${JSON.stringify(command)})`;

    const info = command.message || `Waiting for "${command.handler}"...`;
    store.dispatch(cepRunning(executor, command.handler, info));

    const ilstResponseHandler = result => {
      try {
        const response = <CEPResponse & CEPError>JSON.parse(result);
        if (response.error) {
          // Handle expected errors from ILST
          store.dispatch(cepError(response));
          deferred.reject(response);
        } else {
          store.dispatch(cepHandle(response));
          deferred.resolve(response);
        }
      } catch (error) {
        // Unhandled errors from ILST goes here
        const facepalm = { error, handler: "evalScript" };
        store.dispatch(cepError(facepalm));
        deferred.reject(facepalm);
      }
    };

    cs.evalScript(executor, ilstResponseHandler);

    return deferred.promise;
  };
};

const deps = ["$q", "CSInterface", "CommonConfig", middleware];
app.factory("ilstMiddleware", deps);
