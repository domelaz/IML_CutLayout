import { app } from "../index";

const middleware = () => {
  return store => next => action => {
    console.log("dispatching", action);
    let result = next(action);
    console.log("next state", store.getState());
    return result;
  };
};

app.factory("loggerMiddleware", [middleware]);
