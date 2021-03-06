import { Map } from "immutable";
import { actions as sync } from "../constants";

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

export {
  settings,
};
