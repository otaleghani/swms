export const VALIDATION_SETTINGS = {

  /** Used for name, surname */
  shortString: {
    minLength: 1,
    maxLength: 50,
  },

  /** Used for code, identifier */
  mediumString: {
    minLength: 0,
    maxLength: 100,
  },

  /** Used for description */
  longString: {
    minLength: 0,
    maxLength: 200,
  },

  /** */
  smallNumber: {
    minLength: 36,
    maxLength: 36,
  },

  /** Used for width, height, length, weight, quantity */
  bigNumber: {
    minLength: 36,
    maxLength: 36,
  },

  /** The length of the uuids is always 36 characters */
  foreignKeys: {
    minLength: 36,
    maxLength: 36,
  },

  /** The result of toISOString() is always 24 characters */
  dateString: {
    minLength: 24,
    maxLength: 24,
  },

};
