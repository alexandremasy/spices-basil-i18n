import Currencies from '../vos/number-currencies'
import NumberSigns from '../vos/number-signs'
import NumberStyles from '../vos/number-styles'

export default (basil) => {

  const currency = ({ compact = false, currency = Currencies.EURO, display, fraction = 2, group = true, locale = 'en', significant = 21, sign = NumberSigns.AUTO, value }) => {
    // No value
    if (basil.isNil(value)){
      console.error(`@spices/basil: A value must be provided for the currency formatter: ${value}`)
      return
    }
    
    // Value not a number
    if (!basil.isNumber(value)){
      console.error(`@spices/basil: A value of type number must be provided for the currency formatter: ${value}`)
      return
    }
    
    // No currency
    if (basil.isNil(currency)){
      console.error(`@spices/basil: A currency must be provided for the currency formatter: ${currency}`)
      return
    }

    // Invalid currency => Number with a custom unit
    if (!Currencies.isValid(currency)){
      return basil.unit({
        compact,
        group,
        locale,
        fraction,
        significant,
        sign, 
        unit: currency,
        value
      })
    }

    // Fomatting a proper currency
    let options = {
      currency: currency.alpha,
      notation: compact === true ? 'compact' : 'standard',
      signDisplay: sign,
      style: NumberStyles.CURRENCY,
      useGrouping: group
    }

    if (fraction) { options.maximumFractionDigits = Math.min(20, Math.max(fraction, 0)) }
    if (significant) { options.maximumSignificantDigits = Math.min(21, Math.max(significant, 1)) }

    console.log(options)
    let ret = new Intl.NumberFormat(locale, options).format(value)
    return ret
  }

  basil.currency = currency
  basil.Currencies = Currencies
}
