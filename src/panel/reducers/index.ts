import { Map } from "immutable";
import { actions as a } from "../constants";

type ISettings = Immutable.Map<string, Object>

const initSettings = <ISettings>Map();

const settings = (state = initSettings, action: IReduxAction): ISettings => {
  let newState;
  switch (action.type) {
    case a.sync.SET_APPDATA: {
      newState = state.merge(action.payload);
      break;
    }
    default: {
      newState = assign({}, state);
    }
  }
  return newState;
};

const reducers = {
  settings,
};

export default reducers;
