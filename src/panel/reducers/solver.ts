import { actions as sync } from "../constants";

const reducer: IReducerComposition<ISettings> = {
  [sync.PUSH_SOLUTION]: (state: ISettings, action: IAction<ISolution>) => {
    return state.update("solutions", s => s.push(action.payload));
  },
};

export {
  reducer,
};
