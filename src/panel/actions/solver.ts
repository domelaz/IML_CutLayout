import { actions as sync } from "../constants";

export function pushSolution(solution: ISolution): IAction<ISolution> {
  return {
    payload: solution,
    type: sync.PUSH_SOLUTION,
  };
};

export function solverStop(reason: string): IReduxAction {
  return {
    payload: reason,
    type: sync.SOLVER_ABORT,
  };
};

export function solverStart(message?: string) {
  return {
    payload: message,
    type: sync.SOLVER_START,
  };
};
