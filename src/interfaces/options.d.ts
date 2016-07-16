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
