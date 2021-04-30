import Locale from '../vos/locale'

const VALID = 0x00000
const INVALID_LIST = 0x00001
const INVALID_ITEMS = 0x00010
const INVALID_ITEM = 0x00100
const INVALID_VALUE = 0x010000

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
    this._fallback = Locale.parse('en-GB')
    this._locale = null
    this._locales = null

    this.evaluate()
  }

  ///////////////////////////////////////////////////////////////////////////////

  /**
   * @property {Locale} fallback
   * @returns {Locale}
   *  The fallback locale to use, if no valid options are found.
   */
  get fallback(){
    return this._fallback
  }
  set fallback(value){
    value = Locale.parse(value)

    let validity = this._isLocaleValid(value)
    this._reportLocaleValidity(validity, value, 'basil.i18n.locale')
    this._fallback = value
    console.log('fallback', value);

    // @todo Trigger the matching process
  }

  ///////////////////////////////////////////////////////////////////////////////
  
  /**
   * @returns {Locale}
   * @property {Locale} first
   * @readonly
   */
  get first(){
    return this.hasLocales ? this.locales[0] : null
  }
  
  ///////////////////////////////////////////////////////////////////////////////

  /**
   * @returns {Boolean}
   * @property {Boolean} hasLocales 
   *  Whether or not at least one locales is set in the list available locales
   * @readonly
   */
  get hasLocales(){
    return this._locales && this._locales.length > 0
  }
  
  ///////////////////////////////////////////////////////////////////////////////
  
  /**
   * @returns {Boolean}
   * @property {Boolean} hasLocalStorage
   *  Whether the localStorage feature is there and available or not
   * @readonly
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

  ///////////////////////////////////////////////////////////////////////////////

  /**
   * @returns {Locale}
   * @property {Locale} locale
   *  The current locale. 
   *  If a String is given, it will be converted to a locale. 
   */
  get locale(){
    return this._locale
  }
  set locale(value){
    value = Locale.parse(value)

    let validity = this._isLocaleValid(value)
    this._reportLocaleValidity(validity, value, 'basil.i18n.locale')
    this._locale = value

    this._save()
  }

  ///////////////////////////////////////////////////////////////////////////////

  /**
   * @returns {Array.Locale}
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
    this._reportLocalesValidity(validity, value)
    this._locales = value

    this.evaluate()
    // this.locale = this._getDefaultLocale(this._locale)
  }

  ///////////////////////////////////////////////////////////////////////////////
  
  /**
   * @returns {Locale}
   * @property {Locale} navigator
   *  The navigator.language value. Defaults to en-GB. 
   * @readonly
   */
  get navigator(){
    return Locale.parse(this._parent.get(global, 'window.navigator.language', 'en-GB'))
  }

  ///////////////////////////////////////////////////////////////////////////////
  
  /**
   * @returns {Boolean}
   * @property {Boolean} persistent
   *  Whether or not the locale is persisted in the localStorage
   */
  get persistent(){
    return this._options.locale.persistent === true
  }

  ///////////////////////////////////////////////////////////////////////////////

  /**
   * @returns {Locale}
   * @property {Locale} stored
   *  The stored locale
   */
  get stored(){
    return this.persistent && this.hasLocalStorage ? 
           Locale.parse(localStorage.getItem(this._options.locale.key)) : 
           null
  }

  //////////////////////////////////////////////////////

  /**
   * Trigger the evaluation process of the current locale in order to match the requested criteria.
   * Multiple properties will be evaluated (and altered if needed) to assess their correctness:
   *  - locale
   *  - fallback
   */
  evaluate() {
    let p = [
      this.locale,
      this.stored,
      this.matcher(),
      this.fallback,
      this.first,
      this.navigator
    ]

    // console.table(p.map(e => {
    //   return {
    //     value: e,
    //     valid: this._isLocaleValid(e)
    //   }
    // }))
    
    p = p.filter(e => !this._parent.isNil(e) && !this._parent.isNil(e.langtag))
    p = p.find(l => this._isLocaleValid(l) === 0)
    this.locale = p
  }

  /**
   * Find the values in the list sharing the same country as the given locale
   * 
   * @param {Locale} locale 
   * @param {Array.Locale} list 
   * @returns {Array.Locale}
   */
  getMatchingCountry(locale, list) {
    this._reportLocaleValidity(this._isLocaleValid(locale), locale, 'basil.i18n.getMatchingCountry')
    this._reportLocalesValidity(this._isLocalesValid(list), list, 'basil.i18n.getMatchingCountry')

    let country = locale.country
    return country ?
      list.filter(e => e.country && e.country.toString() === country) :
      list
  }

  /**
   * Find the values in the list sharing the same locale as the given locale
   * 
   * @param {Locale} locale 
   * @param {Array.Locale} list 
   * @returns {Array.Locale}
   */
  getMatchingLocale(locale, list) {
    this._reportLocaleValidity(this._isLocaleValid(locale), locale, 'basil.i18n.getMatchingCountry')
    this._reportLocalesValidity(this._isLocalesValid(list), list, 'basil.i18n.getMatchingCountry')

    let lang = locale.lang
    return lang ?
      list.filter(e => e.lang && e.lang.toString() === lang) :
      list
  }

  /**
   * Find an appriopriate locale in the list of locales.
   * The matching mechanism will be set as the priority option
   * 
   * 
   */
  matcher(){
    let cm = this._parent.get(this._options, 'locale.matcher', null)


    if (this._options.locale){

    }

    return null
  }

  

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
    
    let ret = [
      this.stored,
      value ? value : this._options.locale.value,
      this._options.locale.fallback,
      this.hasLocales ? this.locales[0] : null
    ]
    .map(e => this._parent.isString(e) ? new this._scope.Locale(e) : e)
    .filter(e => !this._parent.isNil(e) && !this._parent.isNil(e.langtag))
    .find(l => this._isLocaleValid(l) === 0)
    
    // console.group('getDefaultLocale');
    // console.table([
    //   (this.hasLocales ? this.locales.map(e => e.toString()) : []).join(','),
    //   this.stored,
    //   value ? value : this._options.locale.value,
    //   this._options.locale.fallback,
    //   this.hasLocales ? this.locales[0] : null,
    //   ret
    // ].map(e => this._parent.isString(e) ? new this._scope.Locale(e).toString() : e))
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
   * @returns {Number}
   */
  _isLocaleValid(value){
    let ret = VALID
    let isset = !this._parent.isNil(value)

    if (!isset || 
       (isset && !(value instanceof this._scope.Locale)) || 
       (isset && value instanceof this._scope.Locale && !value.valid)){
       ret += INVALID_ITEM
    }

    if (this.hasLocales && this._locales.some(l => l.langtag === value.langtag) === false){
      ret += INVALID_VALUE
    }

    // console.log('isValid', value.toString(), ret);

    return ret
  }

  /**
   * Report the validation score of a locale
   * 
   * @param {Number} score The validation score
   * @param {Locale} value The value that has been evaluated
   * @param {String} caller The property that has been evaluated (basil.i18n.locale | basil.i18n.fallback)
   */
  _reportLocaleValidity(score, value, caller = 'basil.i18n') {
    // Validate the type
    if (score & INVALID_ITEM) {
      throw `[${caller}] The value must be an instance of basil.i18n.Locale ${value}`
    }

    // Confirm the value
    if (score & INVALID_VALUE) {
      throw `[${caller}] The value (${value.toString()}) is not in the allowed basil.i18n.locales list. Allowed values: ${this.locales.map(e => e.toString())}`
    }
  }

  /**
   * Report the validation score of a locales list
   * 
   * @param {Number} score The validation score
   * @param {Array} value The value that has been evaluated
   * @param {String} caller The property that has been evaluated (basil.i18n.locales)
   */
  _reportLocalesValidity(score, value, caller = 'basil.i18n.locales'){
    // must be defined
    // must be an array
    if (score & INVALID_LIST) {
      throw `[${caller}] The value must be a valid list of basil.i18n.Locale`
    }

    // must be array of locale
    if (score & INVALID_ITEMS) {
      throw `[${caller}] The value must be a list of basil.i18n.Locale: ${value.map(e => e.toString())}`
    }
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
    if (!this.persistent || !this.hasLocalStorage){
      return
    }

    localStorage.setItem(this._options.locale.key, this._locale)
  }

  

}