import { List, Map } from "immutable";
import { assign } from "lodash";
import { actions as sync } from "../constants";

type ISettings = Immutable.Map<string, Object>

const initSettings = <ISettings>Map();

const settings = (state = initSettings, action: IReduxAction): ISettings => {
  let newState;
  switch (action.type) {
    case sync.SET_APPDATA: {
      newState = state.merge(action.payload);
      break;
    }
    case sync.UPDATE_APPDATA: {
      const [ keyPath, value ] = action.payload;
      newState = state.setIn(keyPath, value);
      break;
    }
    default: {
      newState = state;
    }
  }
  return newState;
};

const initFlow: IFlowState = {
  solutions: List<ISolution>(),
};

const flow = (state = initFlow, action: IReduxAction): IFlowState => {
  let newState;
  switch (action.type) {
    case sync.PUSH_SOLUTION: {
      const solutions = state.solutions.push(action.payload);
      newState = assign({}, state, { solutions });
      break;
    }
    default: {
      newState = state;
    }
  }
  return newState;
};

const reducers = {
  flow,
  settings,
};

export default reducers;
