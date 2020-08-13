import locale from './utils/locale'
import BasilLocale from './vos/locale'

export default {
  install: (basil, options) => {
    if (basil.global) {
      window.BasilLocale = BasilLocale;
    }

    // Utils
    locale(basil);

    // Mixins

  }
}
