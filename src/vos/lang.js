/**
 * Lang representation
 * 
 * @class
 */
export default class BasilLang {
  /**
   * @constructor
   * @param {String} value The language code
   */
  constructor(value) {
    this._value = value;
  }

  /**
   * Return the alpha 2 version
   * 
   * @property {String}
   * @readonly
   */
  get alpha2() {
    return this._value || null;
  }

  /**
   * The String representation
   * 
   * @property {String}
   * @readonly
   */
  toString() {
    return this.alpha2;
  }
}
