import BasilLocale from '../vos/locale'

/**
 * The current locale
 * @property {Locale}
 */
let _locale = null;

export default (basil) => {
  if (basil.hasOwnProperty('locale')){
    return;
  }

  Object.defineProperty(basil, 'locale', {
    get: () => _locale,
    set: (value) => {
      console.log('locale set', value instanceof BasilLocale);
      if (value instanceof BasilLocale === false){
        console.warn('locale must be an instance of BasilLocale');
        return;
      }

      _locale = value;
    }
  })
}
