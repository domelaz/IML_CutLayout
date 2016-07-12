import { actions as a } from "../constants";

export function applySolution(solution: ISolution, message?: string) {
  const command: CEPCommand = {
    data: solution,
    handler: "applySolution",
    message,
  };
  const action: IReduxAction = {
    payload: command,
    type: a.CEP_ASYNC,
  };

  return action;
};

export function getContour(message = "Getting contour...") {
  const command: CEPCommand = {
    handler: "getContour",
    message,
  };
  const action: IReduxAction = {
    payload: command,
    type: a.CEP_ASYNC,
  };

  return action;
};

