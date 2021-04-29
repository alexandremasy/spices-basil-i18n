import currency from './utils/currency'
import date from './utils/date'
import locale from './utils/locale'
import locales from './utils/locales'
import number from './utils/number'
import i18nLocaleController from './core/locale'

import * as vos from './vos'

export default {
  install: (basil, options = {}) => {
    // scope
    basil.i18n = {}
    let scope = basil.i18n

    // vos
    Object.keys(vos).forEach(k => scope[k] = vos[k])

    // Options
    let fallback = 'en-GB'
    Object.defineProperty(scope, 'options', {
      value: {
        locale: {
          fallback: new scope.Locale(basil.get(options, 'locale.fallback', fallback)),
          key: basil.get(options, 'locale.key', 'basil.i18n.locale'),
          persistent: basil.get(options, 'locale.persistent', false) === true,
          value: new scope.Locale(basil.get(options, 'locale.value', basil.get(global, 'window.navigator.language', fallback)))
        },
        locales: basil.get(options, 'locales', [] )
      }
    })
    Object.freeze(scope.options)
    Object.freeze(scope.options.locale)
    Object.freeze(scope.options.locales)

    // Utils
    currency(basil, scope, scope.options)
    date(basil, scope, scope.options)
    number(basil, scope, scope.options)

    // Locales
    const ctrl = new i18nLocaleController(basil, scope, scope.options)
    scope.ctrl = ctrl

    locales(basil, scope, scope.options, ctrl)
    locale(basil, scope, scope.options, ctrl)

  }
}
