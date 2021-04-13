import NumberSigns from '../vos/number-signs'
import NumberStyles from '../vos/number-styles'
import NumberUnits from '../vos/number-units'

export default (basil) => {

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
  const number = ({ compact = false, group = true, locale = "en", fraction = 2, significant = 21, sign, style, unit, value }) => {
    let isStyleUnit = style === NumberStyles.UNIT
    let requestedUnit = unit

    // Sign validation
    if (!NumberSigns.isValid(sign)){
      console.warn(`@spices/basil: Invalid sign: ${sign}. Fallback to default value`)
      sign = NumberSigns.AUTO
    }
    
    // Style validation
    if (!NumberStyles.isValid(style) && style !== NumberStyles.CURRENCY){
      style = NumberStyles.DECIMAL
      console.warn(`@spices/basil: Invalid style: ${sign} for the number formatter. Fallback to default value`)
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
    if (fraction){ options.maximumFractionDigits = Math.min(20, Math.max(fraction, 0)) }
    if (significant){ options.maximumSignificantDigits = Math.min(21, Math.max(significant, 1)) }
    
    let ret = new Intl.NumberFormat(locale, options).format(value)
    
    // Unit validation
    // For a custom unit, set the unit to liter and replace the symbol by the custom one
    if (isStyleUnit && requestedUnit !== unit) {
      ret = ret.replace('L', requestedUnit)
    }

    return ret
  }

  basil.number = number
  basil.NumberSigns = NumberSigns
  basil.NumberStyles = NumberStyles
  basil.NumberUnits = NumberUnits
}