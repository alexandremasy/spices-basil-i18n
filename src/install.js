import currency from './utils/currency'
import date from './utils/date'
import locale from './utils/locale'
import locales from './utils/locales'
import number from './utils/number'

import * as vos from './vos'

export default {
  install: (basil, options = {}) => {
    // scope
    basil.i18n = {}
    let scope = basil.i18n

    // Options
    Object.defineProperty(scope, 'options', {
      value: {
        locale: {
          key: basil.get(options, 'locale.key', 'basil.i18n.locale'),
          persistent: basil.get(options, 'locale.persistent', true) === true
        },
        locales: basil.get(options, 'locales', [])
      }
    })
    Object.freeze(scope.options)
    Object.freeze(scope.options.locale)

    // vos
    Object.keys(vos).forEach(k => scope[k] = vos[k])

    // Utils
    currency(basil, scope, options)
    date(basil, scope, options)
    locale(basil, scope, options)
    locales(basil, scope, options)
    number(basil, scope, options)

    // Mixins

  }
}
