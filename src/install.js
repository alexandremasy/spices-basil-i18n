import locale from './utils/locale'
import BasilLocale from './vos/locale'

export default (basil, options) => {
  if(basil.global){
    window.BasilLocale = BasilLocale;
  }

  // Utils
  locale(basil);

  // Mixins
  
}
