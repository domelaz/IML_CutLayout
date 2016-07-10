import { List } from "immutable";
import { assign } from "lodash";
import { actions as sync } from "../constants";

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

export {
  flow,
};
