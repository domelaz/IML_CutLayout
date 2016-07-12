import { List, Map, fromJS } from "immutable";
import { assign, isFunction } from "lodash";
import { actions as sync } from "../constants";

import { reducer as cep } from "./cep";
import { reducer as solver } from "./solver";

const initFlow: IFlowState = {
  _queue: [],
  contour: null,
  error: null,
  ilstBusy: false,
  isIdle: true,
  message: "Ready",
  solutions: List<ISolution>(),
};

const commonReducers: IReducerComposition<ISettings> = {
  [sync.RESET_STATE]: () => {
    return Map<string, {}>(initFlow);
  },

  [sync.TOGGLE_APP]: (state, action) => {
    const onOff = action.payload.state === "on" ? true : false;
    const update: IFlowState = {
      isIdle: onOff,
      message: action.payload.message,
    };
    return state.merge(update);
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

const reducers = assign(commonReducers, cep, solver);

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
