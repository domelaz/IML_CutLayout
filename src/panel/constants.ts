const actions = {
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
   * Pick successfuly applied solution from temporary queue
   */
  SWAP_SOLUTION: "SWAP_SOLUTION",

  /**
   * Set single application setting
   */
  UPDATE_APPDATA: "UPDATE_APPDATA",
};

export {
  actions,
};
