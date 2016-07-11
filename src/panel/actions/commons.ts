import { actions as sync } from "../constants";

/**
 * Enable/disable UI controls
 *
 * @param {string} state "on" | "off"
 * @param {string} [message] Message shown in status bar
 */
export const toggleApp = (state, message = "") => {
  return <IReduxAction>{
    payload: { state, message },
    type: sync.TOGGLE_APP,
  };
};

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
