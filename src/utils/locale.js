/**
 * @property {Basil} basil The basil intance
 * @property {Object} scope The basil scope (basil.i18n)
 * @property {Object} options The basil i18n options (basil.18n.options)
 */
export default (basil, scope, options) => {
  /**
   * Whether or not the given locale is valid
   * 
   * @param {Locale} locale
   * @returns {Boolean}
   */
  const isValid = (locale) => {
    return !basil.isNil(locale) && // Must be set
      locale instanceof scope.Locale && // Must be a locale
      locale.valid && // Must be a valid locale
      scope.locales.some(l => l.langtag === locale.langtag) // Must be part of the list of locales
  }

  // Find out the proper default value
  // 1. Check if the value is persisted and is valid 
  // 2. Check if the requested locale is valid
  // 3. Or use the fallback
  let _locale = [  
    options.locale.persistent === true ? localStorage.getItem(options.locale.key) : null,
    options.locale.value,
    options.locale.fallback
  ]
  .map(e => basil.isString(e) ? new scope.Locale(e) : e)
  .filter(e => !basil.isNil(e) && !basil.isNil(e.langtag))
  .find(l => isValid(l))

  console.log('i18n.locale', _locale)
  Object.defineProperty(scope, 'locale', {
    enumerable: true,
    get: () => _locale,
    set: (value) => {
      if (basil.isString(value)){
        value = new scope.Locale(value)
      }

      if (!(value instanceof scope.Locale)){
        console.warn('locale must be an instance of basil.i18n.Locale', value);
        return;
      }

      console.log('i18n.locale', value)
      _locale = value
    },
  })
}

