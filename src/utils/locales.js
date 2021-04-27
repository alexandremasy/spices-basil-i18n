export default (basil, scope, options) => {
  const VALID         = 0x00000
  const INVALID_LIST  = 0x00001
  const INVALID_ITEMS = 0x00010

  /**
   * Whether or not the given list of locales is valid
   * 
   * @param {Array.Locale} value 
   * @private
   * @returns {Number}
   */
  const isValid = (value) => {
    let ret = VALID

    // must be defined
    // must be an array
    // must be an array with one value at least
    if (basil.isNil(value) || !basil.isArray(value) || (basil.isArray(value) && value.length === 0)) {
      ret += INVALID_LIST
    }

    // must be array of locale
    if (value.some(l => !(l instanceof scope.Locale))){
      ret += INVALID_ITEMS
    }

    return ret
  }


  // Define the property
  // 1. The options value
  // 2. Fallback to the navigator.language
  let _locales = options.locales || [new scope.Locale(navigator.language)]
  console.log('i18n.locales', _locales)
  Object.defineProperty(scope, 'locales', {
    enumerable: true,
    get: () => _locales,
    set: (value) => {
      let validity = isValid(value)

      // must be defined
      // must be an array
      if (validity & INVALID_LIST){
        console.warn(`Warn basil.i18n.locales: Must be a valid list of Locale`)
        return
      }
      
      // must be array of locale
      if (validity & INVALID_ITEMS){
        console.warn(`Warn basil.i18n.locales: Must be a list of Locale`)
        return
      }
      
      console.log('i18n.locales', value)
      _locales = value
    },    
  })

}
