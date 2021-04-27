/**
 * @property {Basil} basil The basil intance
 * @property {Object} scope The basil scope (basil.i18n)
 * @property {Object} options The basil i18n options (basil.18n.options)
 */
export default (basil, scope, options) => {

  // const storedValue = localStorage.getItem(options.locale.key)

  /**
   * Whether or not the given locale is valid
   * 
   * @param {Locale} locale
   * @returns {Boolean}
   */
  const isValid = (local) => {
    return !basil.isNil(locale) && // Must be set
      locale instanceof scope.Locale && // Must be a locale
      locale.valid && // Must be a valid locale
      this.localeStrings.includes(locale.toString()) // Must be part of the list of locales
  }


  let _locale = new scope.Locale(navigator.language || 'en_GB')
  Object.defineProperty(scope, 'locale', {
    enumerable: true,
    get: () => _locale,
    set: (value) => {
      if (value instanceof Locale === false){
        console.warn('locale must be an instance of basil.i18n.Locale');
        return;
      }

      console.log('i18n.locale', value)
      _locale = value
    },
  })
}

