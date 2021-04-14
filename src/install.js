import currency from './utils/currency'
import date from './utils/date'
import number from './utils/number'

import Currencies from './vos/number-currencies'
import NumberSigns from './vos/number-signs'
import NumberStyles from './vos/number-styles'
import NumberUnits from './vos/number-units'
import DateComponents from './vos/date-components'
import Formats from './vos/formats'
import DateStyles from './vos/date-styles'

export default {
  install: (basil, options) => {
    // scope
    basil.i18n = {}
    let scope = basil.i18n

    // vos
    scope.Currencies = Currencies
    scope.DateComponents = DateComponents
    scope.DateStyles = DateStyles
    scope.Formats = Formats
    scope.NumberSigns = NumberSigns
    scope.NumberStyles = NumberStyles
    scope.NumberUnits = NumberUnits

    // Utils
    currency(basil, scope);
    date(basil, scope);
    number(basil, scope);

    // Mixins

  }
}
