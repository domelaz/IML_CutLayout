import { List, fromJS } from "immutable";
import { assign, isFunction } from "lodash";
import { actions as sync } from "../constants";

import { reducer as solver } from "./solver";

const initFlow: IFlowState = {
  solutions: List<ISolution>(),
};

const reducers = assign({}, solver);

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
