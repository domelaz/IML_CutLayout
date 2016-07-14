/**
 * Общие интерфейсы компонентов приложения
 */

interface ICommonConfig {
  /**
   * Имя метода на стороне ILST, выполняющего запросы CEP
   */
  connector: string;

  /**
   * Данные пользователя по умолчанию
   */
  defaults: AppDataService;

  ilst: {
    applyingDirection: "horizontal" | "vertical";
    areaFocusedColor: number[];
    areaLayerName: string;
    areaStrokeColor: number[];
    layoutLayerName: string;
    originalLayerName: string;
    reportLayerName: string;
    solutionGutter: number;
  }
}

/**
 * Persistent user data
 */
interface ICommonOptions {
  /**
   * Ограничение высоты непрямоугольной ОЗ, % от вала
   */
  floatingEdge?: number;

  /**
   * Вал, pt.
   */
  materialHeight?: number;

  /**
   * Техническая область (обе рельсы), pt.
   */
  nonWorkingArea?: number;

  /**
   * Ограничения на размещение контура в ОЗ
   */
  restrict?: {
    /**
     * Разрешить наложение ручьев
     */
    overlap: boolean;

    /**
     * Разрешить поворот контуров
     */
    rotation: boolean;
  },

  /**
   * Поля на вылет, pt.
   */
  trimOffset?: number;

  /**
   * Выбранные порезы, pt.
   */
  widths?: number[];
}

interface AppDataService extends ICommonOptions {
  /**
   * Выбранный в селекторе материал
   */
  material?: IMaterials;

  /**
   * Массив характеристик запечатываемых материалов
   */
  materials?: IMaterials[];

  /**
   * Ширина пореза по умолчанию
   */
  materialWidth?: number;

  /**
   * Тираж, шт.
   */
  printing?: number;

  /**
   * Solutions selected by user
   */
  solutions?: boolean[];
}

interface IValueItem {
  id: string;
  text: string;
}

interface ILabeledValueItem extends IValueItem {
  label: string;
}

interface IMaterials extends ILabeledValueItem {
  type: string;
  width: number[];
}

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

/**
 * Illustrator Error Struct
 */
interface ILSTError {
  end?: number;
  fileName?: string;
  line?: number;
  message: string;
  name?: string;
  number?: number;
  source?: string;
  start?: number;
}

/**
 * Протокол CEP->ILST
 */
interface CEPCommand {
  /**
   * Имя метода, который обрабатывает запрос на стороне Иллюстратора
   */
  handler: string;

  /**
   * Набор данных для этого метода
   */
  data?: any;

  /**
   * Status bar message
   */
  message?: string;
}

/**
 * Ответ ILST->CEP
 */
interface CEPResponse {
  /**
   * Статус обработки команды
   */
  status: string;

  /**
   * Данные, возвращаемые методом
   */
  data?: any;
}

/**
 * ILST Error -> CEP
 */
interface CEPError {

  error: ILSTError;

  /**
   * ILST method
   */
  handler: string;
}

/**
 * Точка (1/2 сплайна Безье) в ILST
 */
interface IPoint {
  /**
   * Point position
   */
  anchor: number[];

  /**
   * In control point
   */
  leftPosition: number[];

  /**
   * Out control point
   */
  rightPosition: number[];
}

/**
 * Позиция контура в ILST
 *
 * Центром контура считаем пересечение диагоналей прямоугольника,
 * в который "вписывается" контур
 */
interface IPlacement {
  /**
   * Угол вращения оригинального контура относительно центра, в градусах
   */
  angle: number;

  /**
   * Центр контура ([x,y], в пунктах)
   */
  position: number[];
}

/**
 * Контур в ILST
 */
interface IFigure {
  /**
   * Направление (полярность)
   */
  direction: number;

  placement: IPlacement;

  points: IPoint[];
}

/**
 * Формат решения
 */
interface ISolution {
  /**
   * Область размещения
   */
  area: IFigure;

  /**
   * Размещения
   */
  cuts: IPlacement[];

  /**
   * Ширина пореза и длина вала, для которых рассчитано решение
   */
  dimensions: number[];
}
