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

  /** Unused */
  smallSignedNumber: {
    minLength: -128,
    maxLength: 127,
  },

  /** Unused */
  smallUnsignedNumber: {
    minLength: 0,
    maxLength: 255,
  },

  /** -32768 to 32767, Used for quantity */
  bigSignedNumber: {
    minLength: -32768,
    maxLength: 32767,
  },
  
  /** 0 to 65535, Used for width, height, length, weight */
  bigUnsignedNumber: {
    minLength: 0,
    maxLength: 65535,
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
