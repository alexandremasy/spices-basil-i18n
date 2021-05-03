import DateComponent from './date'
import DateTimeComponent from './datetime'
import TimeComponent from './time'

import NumberComponent from './number'
import PercentComponent from './percent'
import UnitComponent from './unit'

import CurrencyComponent from './currency'

export default (Vue) => {
  Vue.component('i18n-date', DateComponent)
  Vue.component('i18n-datetime', DateTimeComponent)
  Vue.component('i18n-time', TimeComponent)

  Vue.component('i18n-number', NumberComponent)
  Vue.component('i18n-percent', PercentComponent)
  Vue.component('i18n-unit', UnitComponent)

  Vue.component('i18n-currency', CurrencyComponent)
}