import Formats from '../vos/formats'
import Currencies from '../vos/number-currencies'
import NumberSigns from '../vos/number-signs'
import NumberStyles from '../vos/number-styles'

export default (basil, scope) => {

  const currency = (value, options = {}) => {
    let { 
      compact = false, 
      currency = Currencies.EURO, 
      display = Formats.SYMBOL, 
      fraction = 2, 
      group = true, 
      locale = 'en', 
      significant, 
      sign = NumberSigns.AUTO 
    } = options
    let requestedCurrency = currency

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

    // Invalid currency => EURO and replace with custom value
    if (!Currencies.isValid(currency)){
      currency = Currencies.EURO
    }

    // Display validation
    display = basil.isNil(display) ? Formats.SYMBOL : display
    if (![Formats.SYMBOL, Formats.NARROW_SYMBOL, Formats.CODE, Formats.NAME].includes(display)) {
      console.warn(`@spices/basil: Invalid display: ${display} for the currency formatter. Fallback to default value`)
      display = Formats.SYMBOL
    }

    // Fomatting a proper currency
    let o = {
      currency: currency.alpha,
      notation: compact === true ? 'compact' : 'standard',
      signDisplay: sign,
      style: NumberStyles.CURRENCY,
      useGrouping: group
    }

    if (display){ o.currencyDisplay = display }
    if (fraction) { o.maximumFractionDigits = Math.min(20, Math.max(fraction, 0)) }
    if (significant) { o.maximumSignificantDigits = Math.min(21, Math.max(significant, 1)) }

    // console.log(locale, JSON.stringify(o));
    let ret = new Intl.NumberFormat(locale, o).format(value)

    // Custom currency
    if (requestedCurrency != currency){
      let key = '€'
      switch (display) {
        case Formats.SYMBOL:
        case Formats.NARROW_SYMBOL:
        default:
          key = '€'
          break
  
        case Formats.CODE:
          key = 'EUR'
          break
  
        case Formats.NAME:
          key = value > 1 ? 'euros' : 'euro'
          break
      }

      ret = ret.replace(key, requestedCurrency)
    }

    return ret
  }

  scope.currency = currency
}
