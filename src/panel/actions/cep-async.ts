import { actions as a } from "../constants";

export function applySolution(data: IActionApplySolution, message?: string) {
  const command: CEPCommand = {
    data: data,
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

export function zoomSolution(next: number, prev: number) {
  const command: CEPCommand = {
    data: { next, prev },
    handler: "zoomSolution",
  };
  const action: IReduxAction = {
    payload: command,
    type: a.CEP_ASYNC,
  };

  return action;
};
