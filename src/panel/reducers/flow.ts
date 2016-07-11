import { List, Map, fromJS } from "immutable";
import { assign, isFunction } from "lodash";
import { actions as sync } from "../constants";

import { reducer as solver } from "./solver";

const initFlow: IFlowState = {
  _queue: [],
  solutions: List<ISolution>(),
};

const commonReducers: IReducerComposition<ISettings> = {
  [sync.RESET_STATE]: () => {
    return Map<string, {}>(initFlow);
  },

  [sync.SWAP_SOLUTION]: (state: ISettings, action: IAction<ISolution>) => {
    const newState = state.withMutations(map => {
      map
      .update("_queue", s => s.rest())
      .update("solutions", s => s.push(action.payload));
    });
    return newState;
  },
};

const reducers = assign(commonReducers, solver);

const flow = (jsState = initFlow, action: IReduxAction): IFlowState => {
  const state = <ISettings>fromJS(jsState);
  let newState: ISettings;

  const handler = reducers[action.type];
  if (isFunction(handler)) {
    newState = handler(state, action);
  } else {
    newState = state;
  }

  return newState.toJS();
};

export {
  flow,
};
