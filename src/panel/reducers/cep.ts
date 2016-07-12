import { actions as sync } from "../constants";

const reducer: IReducerComposition<ISettings> = {
  /**
   * Lock ILST, display status message
   */
  [sync.CEP_RUNNING]: (state, action: IAction<IActionCEPRunning>) => {
    const { cepCommand, handler, message } = action.payload;

    const update: IFlowState = {
      cepCommand,
      handler,
      ilstBusy: true,
      message,
    };
    return state.merge(update);
  },

export {
  reducer,
};
