import { actions as sync } from "../constants";

/**
 * Reset state except `settings`
 */
export const resetState = () => {
  return {
    type: sync.RESET_STATE,
  };
};

/**
 * Shift solution from temporary queue to storage
 */
export const swapSolution = (solution: ISolution) => {
  return {
    payload: solution,
    type: sync.SWAP_SOLUTION,
  };
};
