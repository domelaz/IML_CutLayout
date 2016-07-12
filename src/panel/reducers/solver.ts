import { actions as sync } from "../constants";

const reducer: IReducerComposition<ISettings> = {
  [sync.SOLVER_ABORT]: (state, action) => {
    return state.withMutations(map => {
      map.set("solverBusy", false).set("isIdle", true);
    });
  },

  [sync.SOLVER_DONE]: (state, action) => {
    return state.set("solverBusy", false);
  },

  [sync.SOLVER_START]: (state, action) => {
    return state.withMutations(map => {
      map.set("solverBusy", true).set("message", action.payload);
    });
  },

  [sync.PUSH_SOLUTION]: (state: ISettings, action: IAction<ISolution>) => {
    return state.update("_queue", s => s.push(action.payload));
  },
};

export {
  reducer,
};
