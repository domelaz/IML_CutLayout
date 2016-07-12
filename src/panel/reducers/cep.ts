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

  /**
   * Release ILST
   */
  [sync.CEP_HANDLE]: (state: ISettings, action: IAction<CEPResponse>) => {
    const { status } = action.payload;

    const update: IFlowState = {
      ilstBusy: false,
      message: `"${state.get("handler")}": ${status}`,
    };
    return state.merge(update);
  },

  /**
   * Handle ILST error
   */
  [sync.CEP_ERROR]: (state: ISettings, action: IAction<CEPError>) => {
    const err = action.payload;

    const update: IFlowState = {
      error: err.error,
      handler: err.handler,
      ilstBusy: false,
      message: err.handler + ": " + err.error.message,
    };
    return state.merge(update);
  },

  [sync.SET_CONTOUR]: (state: ISettings, action: IAction<IFigure>) => {
    return state.set("contour", action.payload);
  },
};

export {
  reducer,
};
