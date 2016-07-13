import { config } from "../config";
import { arrayToCMYK, getCenter } from "./utils";

export const zoomSolution = (data): CEPResponse => {
  const doc = app.activeDocument;
  const area = doc.layers.getByName(config.ilst.areaLayerName);
  const { prev, next } = data;

  if (prev !== -1) {
    area.pathItems[prev].filled = false;
  }

  const focused = area.pathItems[next];
  focused.fillColor = arrayToCMYK(config.ilst.areaFocusedColor);
  focused.filled = true;

  if (doc.views.length === 1) {
    const zoom = getCenter(focused);
    doc.views[0].centerPoint = zoom;
  }

  return {
    status: "success",
  };
};
