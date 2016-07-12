const actions = {
  /**
   * Deals with promised ILST command
   */
  CEP_ASYNC: "CEP_ASYNC",

  /**
   * Handle ILST error
   */
  CEP_ERROR: "CEP_ERROR",

  /**
   * Release ILST lock
   */
  CEP_HANDLE: "CEP_HANDLE",

  /**
   * Lock ILST
   */
  CEP_RUNNING: "CEP_RUNNING",

  /**
   * Handle solution from Solver
   */
  PUSH_SOLUTION: "PUSH_SOLUTION",

  /**
   * Reset state except `settings`
   */
  RESET_STATE: "RESET_STATE",

  /**
   * Set application settings with single Object
   */
  SET_APPDATA: "SET_APPDATA",

  /**
   * Save contour in state
   */
  SET_CONTOUR: "SET_CONTOUR",

  /**
   * Pick successfuly applied solution from temporary queue
   */
  SWAP_SOLUTION: "SWAP_SOLUTION",

  /**
   * Enable/disable UI controls
   */
  TOGGLE_APP: "TOGGLE_APP",

  /**
   * Set single application setting
   */
  UPDATE_APPDATA: "UPDATE_APPDATA",
};

export {
  actions,
};
