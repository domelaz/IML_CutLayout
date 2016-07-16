interface IReduxService {
  connect(mapStateToTarget: (state: IRootReducer) => Object, mapDispatchToTarget: Object | Function): Function;
  dispatch(action: IReduxAction | IReduxReducer<any>): any;
  getState(): IRootReducer;
  replaceReducer(): void;
  subscribe(listener: Function): Function;
}

/**
 * Reducers
 */
interface IRootReducer {
  flow: IFlowState;
  settings: Immutable.Map<string, Object>;
}

interface IReducerComposition<T> {
  [method: string]: IReduxReducer<T>;
}

interface IReduxReducer<T> {
  (state: T, action: IReduxAction): T;
}

interface IReduxAction {
  type: string;
  payload?: any;
}

interface IAction<T> extends IReduxAction {
  payload: T;
}

interface IActionCEPRunning {
  cepCommand: string;
  handler: string;
  message?: string;
}

interface IActionApplySolution {
  solution: ISolution;
  opt?: {
    printing: number;
  };
}

type ISettings = Immutable.Map<string, any>

interface IFlowState {
  _queue?: ISolution[];
  cepCommand?: string;
  contour?: IFigure;
  error?: ILSTError;
  handler?: string;
  ilstBusy?: boolean;
  isIdle?: boolean;
  message?: string;
  solutions?: Immutable.List<ISolution>;
  solverBusy?: boolean;
}
