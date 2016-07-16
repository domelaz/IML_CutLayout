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
