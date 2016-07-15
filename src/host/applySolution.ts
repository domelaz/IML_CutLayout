import { config } from "../config";
import { STRINGS as t } from "./constants";
import { getReportData } from "./reportData";
import { arrayToCMYK, getCenter, getLayer } from "./utils";

/**
 * Создаём новый артборд, возвращаем дельты для позиционирования контуров
 *
 * @param {string} name Название монтажной области
 * @param {Document} doc
 * @param {ISolution} data
 * @param {string} [orientation] В полосу или в колонку
 * @return {array}
 */
const makeArtboard = (
  name: string,
  doc: Document,
  data: ISolution,
  orientation = config.ilst.applyingDirection
  ): number[] => {
  /**
   * Alias for orientation
   */
  const isVert = orientation !== "horizontal";

  /**
   * Gutter between artboards
   */
  const gutter = config.ilst.solutionGutter;

  /**
   * Определение позиции нового артборда и вычисление смещения решения
   * относительно этой позиции
   */
  const lastArtboardIndex = doc.artboards.length - 1;
  const lastArtboard = doc.artboards[lastArtboardIndex];
  const [ left, top, right, bottom ] = lastArtboard.artboardRect;
  const [ nextArtWidth, nextArtHeight ] = data.dimensions;

  const deltaX = isVert ? 0 : right + gutter;
  const deltaY = isVert ? bottom - gutter : 0;

  doc.artboards.add([
    isVert ? left : deltaX,
    isVert ? deltaY : top,
    isVert ? nextArtWidth : nextArtWidth + deltaX,
    isVert ? bottom - nextArtHeight : -nextArtHeight,
  ]).name = name; // todo: Add solution hash to interface

  return [deltaX, deltaY];
};

export const applySolution = (data: IActionApplySolution): CEPResponse => {
  const doc = app.activeDocument;

  const solution = data.solution;

  const { areaLayerName, areaStrokeColor, layoutLayerName, originalLayerName,
    reportLayerName } = config.ilst;

  /**
   * Нормализация оригинала при первом запуске
   */
  if (doc.layers.length === 1) {
    doc.layers[0].name = originalLayerName;
    doc.rulerOrigin = [0, solution.dimensions[1]];
  }

  const [ deltaX, deltaY ] = makeArtboard("Solution #n", doc, solution);

  /**
   * Базовый контур и его положение относительно начала координат
   */
  const original = doc.layers.getByName(originalLayerName).pathItems[0];
  const [ origX, origY ] = getCenter(original);
  const mZero = app.getTranslationMatrix(deltaX - origX, deltaY - origY);

  /**
   * Создание Области Размещения на слое "area"
   */
  const areaLayer = getLayer(doc, areaLayerName);
  const area = areaLayer.pathItems.add();

  area.polarity = solution.area.direction === -1
    ? PolarityValues.NEGATIVE
    : PolarityValues.POSITIVE;

  for (let i = 0, l = solution.area.points.length; i < l; i++) {
    const { anchor, leftPosition, rightPosition } = solution.area.points[i];
    const point = area.pathPoints.add();
    point.anchor = anchor;
    point.leftDirection = leftPosition;
    point.rightDirection = rightPosition;
  }

  area.closed = true;
  area.filled = false;

  area.strokeColor = arrayToCMYK(areaStrokeColor);
  area.stroked = true;

  area.translate(deltaX, deltaY);

  try {
    const anchor = areaLayer.pathItems[areaLayer.pathItems.length - 1];
    area.move(anchor, ElementPlacement.PLACEAFTER);
  } catch (error) {
    // First placement, relax.
  }

  /**
   * Слой высечек
   */
  const layoutLayer = getLayer(doc, layoutLayerName);
  const placementMarker = layoutLayer.pathItems.add();

  /**
   * Размещение высечек на слой "layout"
   */
  for (let i = 0, l = solution.cuts.length; i < l; i++) {
    let anchor: PathItem;

    try {
      anchor = layoutLayer.pathItems[layoutLayer.pathItems.length - 1];
    } catch (error) {
      // First placement
     anchor = placementMarker;
    }

    const c = original.duplicate(anchor, ElementPlacement.PLACEAFTER);

    const { position, angle } = solution.cuts[i];
    let [ shiftX, shiftY ] = position;

    if (angle !== 0) {
      c.rotate(angle);
      const corrections = getCenter(c);
      shiftX += origX - corrections[0];
      shiftY += origY - corrections[1];
    }

    const mGo = app.concatenateTranslationMatrix(mZero, shiftX, shiftY);

    c.transform(mGo, true, false, false, false, false, Transformation.CENTER);
  }

  placementMarker.remove();

  if (data.opt) {
    const statsData = getReportData({
      area: Math.abs(area.area),
      contour: Math.abs(original.area),
      contours: solution.cuts.length,
      height: solution.dimensions[1],
      printing: data.opt.printing,
    });

    const stats = [
      `${t.cuts}:\t\t${solution.cuts.length}`,
      `${t.printing}:\t\t\t\t${data.opt.printing}`,
      `${t.obloy}:\t\t\t${statsData.obloy}%`,
      `${t.material}:\t${statsData.material}м`,
    ];

    // document.write() statistics
    const reportLayer = getLayer(doc, reportLayerName);
    const report = reportLayer.textFrames.add();

    report.textRange.size = 48;
    report.textRange.fillColor = arrayToCMYK(areaStrokeColor);
    report.contents = stats.join("\n");
    report.position = [ deltaX + 20, deltaY - 20 ];
  }

  return { status: "success" };
};
