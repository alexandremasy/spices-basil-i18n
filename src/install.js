import locale from './utils/locale'
import number from './utils/number'
import date from './utils/date'

import BasilLocale from './vos/locale'

export default {
  install: (basil, options) => {
    if (basil.global) {
      window.BasilLocale = BasilLocale;
    }

    // Utils
    locale(basil);
    number(basil);
    date(basil);

    // Mixins

  }
}
