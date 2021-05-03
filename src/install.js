import currency from './utils/currency'
import date from './utils/date'
import number from './utils/number'
import i18nLocaleController from './core/locale'
import i18nNumberComponent from './components/number'
import i18nDateComponent from './components/date'

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
          key: basil.get(options, 'locale.key', 'basil.i18n.locale'),
          matcher: basil.get(options, 'locale.matcher', null),
          persistent: basil.get(options, 'locale.persistent', false) === true,
          priority: basil.get(options, 'locale.priority', scope.Priority.LOCALE),
          // value: new scope.Locale(basil.get(options, 'locale.value', basil.get(global, 'window.navigator.language', fallback)))
        },
        // locales: basil.get(options, 'locales', [] )
      }
    })
    Object.freeze(scope.options)
    Object.freeze(scope.options.locale)
    // Object.freeze(scope.options.locales)

    // Utils
    currency(basil, scope, scope.options)
    date(basil, scope, scope.options)
    number(basil, scope, scope.options)

    // Locales
    const ctrl = new i18nLocaleController(basil, scope, scope.options)
    scope.ctrl = ctrl // @temp for dev

    Object.defineProperty(scope, 'fallback', {
      enumerable: true,
      get: () => ctrl.fallback,
      set: (value) => ctrl.fallback = value
    })

    Object.defineProperty(scope, 'locale', {
      enumerable: true,
      get: () => ctrl.locale,
      set: (value) => ctrl.locale = value
    })

    Object.defineProperty(scope, 'locales', {
      enumerable: true,
      get: () => ctrl.locales,
      set: (value) => ctrl.locales = value
    })

    // Components
    if (!!basil.$vue){
      basil.$vue.component('i18n-number', i18nNumberComponent)
      
      basil.$vue.component('i18n-date', i18nDateComponent)
    }
  }
}
