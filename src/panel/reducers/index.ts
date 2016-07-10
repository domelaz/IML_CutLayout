/**
 * Root reducer composition
 */
import { settings } from "./appSettings";
import { flow } from "./flow";

const reducers = {
  flow,
  settings,
};

export default reducers;
