import { actions as sync } from "../constants";

export function pushSolution(data): IReduxAction {
  return {
    payload: data,
    type: sync.PUSH_SOLUTION,
  };
};
