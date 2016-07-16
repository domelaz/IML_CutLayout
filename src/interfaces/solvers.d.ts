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
