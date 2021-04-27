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

    // vos
    Object.keys(vos).forEach(k => scope[k] = vos[k])

    // Options
    Object.defineProperty(scope, 'options', {
      value: {
        locale: {
          fallback: basil.get(options, 'locale.fallback', 'en-GB'),
          key: basil.get(options, 'locale.key', 'basil.i18n.locale'),
          persistent: basil.get(options, 'locale.persistent', true) === true,
          value: basil.get(options, 'locale.value', navigator.language)
        },
        locales: basil.get(options, 'locales', [new scope.Locale(navigator.language)] )
      }
    })
    Object.freeze(scope.options)
    Object.freeze(scope.options.locale)
    Object.freeze(scope.options.locales)

    // Utils
    currency(basil, scope, scope.options)
    date(basil, scope, scope.options)
    locales(basil, scope, scope.options)
    locale(basil, scope, scope.options)
    number(basil, scope, scope.options)

    // Mixins

  }
}
