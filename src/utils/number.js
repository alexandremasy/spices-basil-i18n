import NumberSigns from '../vos/number-signs'
import NumberStyles from '../vos/number-styles'
import NumberUnits from '../vos/number-units'
import Formats from '../vos/formats'

export default (basil, scope) => {

  /**
   * Format the given number with the intl.NumberFormatter
   * The ouput might be altered depending on the given options
   * 
   * @param {Object}  options 
   * @param {Boolean} [options.compact=false] - Wether or not use a compact form of output. Useful for legend and such narrow places 
   * @param {String}  [options.locale=en] - The locale to use 
   * @param {String}  [options.sign=auto] - When to display the sign for the number. Allowed values "auto", "never", "always", "exceptZero" 
   * @param {String}  [options.style=decimal] - The formatting style to use.
   * @param {Number}  options.value - The value to format
   * @returns 
   */
  const number = ({ compact = false, display = Formats.SHORT, group = true, locale = 'en', fraction = 2, significant = 21, sign = NumberSigns.AUTO, style = NumberStyles.DECIMAL, unit, value }) => {
    let isStyleUnit = style === NumberStyles.UNIT
    let requestedUnit = unit

    // Validate the value is a number
    if (!basil.isNumber(value)){
      return console.error(`@spices/basil: Invalid value for the number formatter: ${value}`)
    }

    // Sign validation
    if (!NumberSigns.isValid(sign)){
      console.warn(`@spices/basil: Invalid sign: ${sign}. Fallback to default value`)
      sign = NumberSigns.AUTO
    }
    
    // Style validation
    if (!NumberStyles.isValid(style) || style === NumberStyles.CURRENCY){
      console.warn(`@spices/basil: Invalid style: ${style} for the number formatter. Fallback to default value`)
      style = NumberStyles.DECIMAL
    }
    
    // Display validation
    if (basil.isNil(display) || ![Formats.LONG, Formats.SHORT, Formats.NARROW].includes(display)){
      console.warn(`@spices/basil: Invalid display: ${display} for the number formatter. Fallback to default value`)
      display = Formats.SHORT
    }

    // Unit validation
    // For a custom unit, set the unit to liter and replace the symbol by the custom one
    if (!NumberUnits.isValid(unit) && isStyleUnit){
      unit = NumberUnits.LITER
    }

    let options = {
      notation: compact === true ? 'compact' : 'standard',
      signDisplay: sign,
      style: style,
      useGrouping: group
    }
    
    if (isStyleUnit){ options.unit = unit }
    if (isStyleUnit && display){ options.unitDisplay = display }
    if (fraction){ options.maximumFractionDigits = Math.min(20, Math.max(fraction, 0)) }
    if (significant){ options.maximumSignificantDigits = Math.min(21, Math.max(significant, 1)) }
    
    console.log(options)
    let ret = new Intl.NumberFormat(locale, options).format(value)
    
    // Unit validation
    // For a custom unit, set the unit to liter and replace the symbol by the custom one
    if (isStyleUnit && requestedUnit !== unit) {
      ret = ret.replace('L', requestedUnit)
    }

    return ret
  }

  const percent = (options) => {
    options.style = NumberStyles.PERCENT
    return number(options)
  }

  const unit = (options) => {
    options.style = NumberStyles.UNIT
    return number(options)
  }

  scope.number = number
  scope.percent = percent
  scope.unit = unit
}