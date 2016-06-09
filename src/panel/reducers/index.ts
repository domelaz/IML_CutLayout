import { assign } from "lodash";
import { actions as a } from "../constants";

const initState = {};

const settings = (state = initState, action: IReduxAction) => {
  let newState;
  switch (action.type) {
    case a.sync.SET_APPDATA: {
      newState = assign({}, state, action.payload);
      break;
    }
    default: {
      newState = assign({}, state);
    }
  }
  return newState;
};

const reducers: IRootReducer = {
  settings,
};

export default reducers;
