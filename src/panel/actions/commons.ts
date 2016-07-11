import { actions as sync } from "../constants";

/**
 * Shift solution from temporary queue to storage
 */
export const swapSolution = (solution: ISolution) => {
  return {
    payload: solution,
    type: sync.SWAP_SOLUTION,
  };
};
