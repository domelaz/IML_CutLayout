interface IReportDataIn {
  /**
   * Площадь Области Размещения, pt
   */
  area: number;

  /**
   * Площадь контура, pt
   */
  contour: number;

  /**
   * Количество контуров в ОР, шт.
   */
  contours: number;

  /**
   * Вал, pt
   */
  height: number;

  /**
   * Тираж, шт.
   */
  printing: number;
}

interface IReportDataOut {
  /**
   * Процент облоя
   */
  obloy: number;

  /**
   * Количество погонных метров материала
   */
  material: number;
}
