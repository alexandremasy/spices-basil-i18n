/**
 * Lang representation
 * 
 * @class
 */
export default class Lang {
  
  /**
   * @constructor
   * @param {String} value The language code
   */
  constructor(value) {
    this._value = value.trim()
  }

  /**
   * Return the alpha 2 version
   * 
   * @property {String}
   * @readonly
   */
  get alpha2() {
    return this._value || null
  }

  /**
   * @property {Boolean}
   * @readonly
   */
  get valid() {
    return this._value && this._value.length > 0
  }

  /**
   * The String representation
   * 
   * @property {String}
   * @readonly
   */
  toString() {
    return this.alpha2
  }
}
