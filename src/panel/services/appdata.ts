import { merge, isEqual } from "lodash";
import { app } from "../index";
import { setAppData } from "../actions";

const service = (redux: IReduxService, storage, config: ICommonConfig) => {
  /**
   * At init stage keep app defaults from config
   * Later used to track changes against app state
   */
  const appDefaults = merge({}, config.defaults);

  /**
   * This fields from state is persistent:
   */
  const storable = ["material", "materials", "printing"];

  /**
   * Merge defaults with storable data
   */
  storable.forEach(key => {
    const record = storage.get(key);
    if (record) {
      appDefaults[key] = JSON.parse(record);
    }
  });

  if (typeof(appDefaults.widths) === "undefined") {
    appDefaults.widths = appDefaults.material.width.slice(0);
  }

  redux.dispatch(setAppData(appDefaults));

  /**
   * When someone update the state -- sync storable data with localStorage
   */
  const syncStorage = () => {
    const state = redux.getState().settings;
    storable.forEach(key => {
      const newValue = state.get(key);
      if (!isEqual(appDefaults[key], newValue)) {
        storage.set(key, JSON.stringify(newValue));
        appDefaults[key] = newValue;
      }
    });
  };

  redux.subscribe(syncStorage);

  return () => {
    console.warn("AppData conntected to Redux, use state and actions instead");
  };
};

app.factory("AppData", [
  "$ngRedux",
  "localStorageService",
  "CommonConfig",
  service,
]);
