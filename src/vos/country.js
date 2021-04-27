/**
 * Country
 * 
 * @class
 */
export default class Country {

  /**
   * @constructor 
   * @param {String} value 
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
    return this._value != null && this._value.length > 0
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
