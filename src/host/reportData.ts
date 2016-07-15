import { round2 } from "./utils";

const ptToM = 0.352778 / 1000;

export const getReportData = (data: IReportDataIn): IReportDataOut => {
  const { area, contour, contours, height, printing } = data;

  /**
   * Количество облоя
   */
  const obloyPoints = area - (contours * contour);

  /**
   * ...в процентах
   */
  const obloyPercent = Math.abs(obloyPoints / area * 100);

  /**
   * ...округленное
   */
  const obloy = round2(obloyPercent);

  /**
   * Количество материала в метрах, округленное
   */
  const material = round2(printing / contours * height * ptToM);

  const result = {
    material,
    obloy,
  };

  return result;
};
