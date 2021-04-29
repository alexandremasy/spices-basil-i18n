const VALID = 0x00000
const INVALID_LIST = 0x00001
const INVALID_ITEMS = 0x00010

/**
 * @class
 */
export default class i18nLocaleController {

  /**
   * @constructor
   * @param {*} options 
   */
  constructor(basil, scope, options = {}){
    this._options = options
    this._parent = basil
    this._scope = scope
    this._fallback = options.locale.fallback

    this.reset()
  }

  //////////////////////////////////////////////////////

  /**
   * @property {Boolean} hasLocales 
   *  Whether or not at least one locales is set in the list available locales
   */
  get hasLocales(){
    return this._locales && this._locales.length > 0
  }

  /**
   * @property {Boolean} hasLocalStorage
   *  Whether the localStorage feature is there and available or not
   */
  get hasLocalStorage(){
    let ret = true
    if (typeof localStorage !== 'undefined') {
      try {
        localStorage.setItem('feature_test', 'yes');
        if (localStorage.getItem('feature_test') === 'yes') {
          localStorage.removeItem('feature_test');
          // localStorage is enabled
        } else {
          // localStorage is disabled
          ret = false
        }
      } catch (e) {
        // localStorage is disabled
        ret = false
      }
    } else {
      // localStorage is not available
      ret = false
    }

    return ret
  }

  /**
   * @property {Locale|String} locale
   *  The current locale. 
   *  If a String is given, it will be converted to a locale. 
   */
  get locale(){
    return this._locale
  }
  set locale(value){
    // Auto convert string to Locale
    if (this._parent.isString(value)){
      value = new this._scope.Locale(value)
    }

    // Validate the type
    if (!(value instanceof this._scope.Locale)){
      throw `[basil.i18n.locale] locale must be an instance of basil.i18n.Locale ${value}`
    }
    
    // Confirm validity
    if (!this._isLocaleValid(value)){
      throw `[basil.i18n.locale] locale must be a valid basil.i18n.Locale ${value.toString()})`
    }

    this._locale = value

    if (this.persistent === true){
      this._save()
    }
  }

  /**
   * @property {Array.Locale} locales
   *  The list of available locales. 
   *  By default the value is null. 
   *  If provided, then the locale must be part of this list.
   */
  get locales(){
    return this._locales
  }
  set locales(value){
    let validity = this._isLocalesValid(value)

    // must be defined
    // must be an array
    if (validity & INVALID_LIST) {
      throw `[basil.i18n.locales] Must be a valid list of Locale`
    }

    // must be array of locale
    if (validity & INVALID_ITEMS) {
      throw `[basil.i18n.locales] Must be a list of Locale`
    }

    this._locales = value

    // Reset the locale to confirm the validity 
    this.locale = this._getDefaultLocale(this._locale)
  }
  
  /**
   * @property {Boolean} persistent
   *  Whether or not the locale is persisted in the localStorage
   */
  get persistent(){
    return this._options.locale.persistent === true
  }

  /**
   * @property {String} stored
   *  The stored locale
   */
  get stored(){
    return this.persistent && this.hasLocalStorage ? localStorage.getItem(this._options.locale.key) : null
  }

  //////////////////////////////////////////////////////

  /**
   * Find out the proper default locale
   * 1. Check if the value is persisted and is valid
   * 2. Check if the requested locale is valid (either the given value or the options defined one)
   * 3. Or use the fallback
   * 4. Or use the first available value in locales
   * 
   * @private
   * @returns {Locale}
   */
  _getDefaultLocale(value) {
    // console.group('getDefaultLocale');
    // console.table([
    //   this.stored,
    //   value ? value : this._options.locale.value,
    //   this._options.locale.fallback,
    //   this.hasLocales ? this.locales[0] : null
    // ].map(e => this._parent.isString(e) ? new this._scope.Locale(e).toString() : e))
    
    let ret = [
      this.stored,
      value ? value : this._options.locale.value,
      this._options.locale.fallback,
      this.hasLocales ? this.locales[0] : null
    ]
    .map(e => this._parent.isString(e) ? new this._scope.Locale(e) : e)
    .filter(e => !this._parent.isNil(e) && !this._parent.isNil(e.langtag))
    .find(l => this._isLocaleValid(l))
    
    // console.log(ret)
    // console.groupEnd('getDefaultLocale');
    return ret
  }

  /**
   * Whether or not the given list of locales is valid
   *
   * @param {Array.Locale} value
   * @private
   * @returns {Number}
   */
  _isLocalesValid(value){
    let ret = VALID

    // must be defined
    // must be an array
    // must be an array with one value at least
    if (basil.isNil(value) || !basil.isArray(value) || (basil.isArray(value) && value.length === 0)) {
      ret += INVALID_LIST
    }

    // must be array of locale
    if (value.some(l => !(l instanceof this._scope.Locale))) {
      ret += INVALID_ITEMS
    }

    return ret
  }

  /**
   * Whether or not the given locale is valid
   *
   * @param {Locale} locale
   * @private
   * @returns {Boolean}
   */
  _isLocaleValid(value){
    let isset = !this._parent.isNil(value)

    return isset && // Must be set
           value instanceof this._scope.Locale && // Must be a locale
           value.valid && // Must be a valid locale
           (!this.hasLocales || (this.hasLocales && this._locales.some(l => l.langtag === value.langtag))) // Must be part of the list of locales
  }

  /**
   * Reset the to the initial state
   * - Utils for the unit tests
   */
  reset(){
    this._locale = this._getDefaultLocale()
    this._locales = null
    // console.info('i18n.reset > ', this._locale.toString())
  }

  /**
   * Save the current locale in the locale storage
   * 
   * @private
   */
  _save(){
    localStorage.setItem(this._options.locale.key, this._locale)
  }
}