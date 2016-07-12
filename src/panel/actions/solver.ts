import { actions as sync } from "../constants";

export function pushSolution(solution: ISolution): IAction<ISolution> {
  return {
    payload: solution,
    type: sync.PUSH_SOLUTION,
  };
};
