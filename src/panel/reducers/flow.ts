import { List, fromJS } from "immutable";
import { assign } from "lodash";
import { actions as sync } from "../constants";

const initFlow: IFlowState = {
  solutions: List<ISolution>(),
};

const flow = (jsState = initFlow, action: IReduxAction): IFlowState => {
  const state = <ISettings>fromJS(jsState);
  let newState: ISettings;
  switch (action.type) {
    case sync.PUSH_SOLUTION: {
      newState = state.update("solutions", s => s.push(action.payload));
      break;
    }
    default: {
      newState = state;
    }
  }
  return newState.toJS();
};

export {
  flow,
};
