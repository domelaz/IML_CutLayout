import { isArray } from "lodash";
import { actions as a } from "../constants";

export function setAppData(...args): IReduxAction {
  // Pass object to Map.merge
  if (args.length === 1) {
    return {
      payload: args[0],
      type: a.sync.SET_APPDATA,
    };
  }

  // Pass array to Map.setIn
  if (isArray(args[0]) && args.length > 1) {
    return {
      payload: args,
      type: a.sync.UPDATE_APPDATA,
    };
  }
};
