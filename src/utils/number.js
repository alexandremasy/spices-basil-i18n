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
  const number = (value, options = {}) => {
    let { 
      compact = false, 
      display = Formats.SHORT, 
      fraction = 2, 
      group = true, 
      locale = scope.locale || scope.fallback || 'en',
      sign = NumberSigns.AUTO, 
      significant, 
      style = NumberStyles.DECIMAL, 
      unit 
    } = options
    let isStyleUnit = style === NumberStyles.UNIT
    let requestedUnit = unit

    
    // Validate the value is a number
    if (!basil.isNumber(value)){
      return console.error(`[@spices/basil.i18n.number] Invalid value for the number formatter: ${value} as ${typeof value}`)
    }

    // Sign validation
    if (!NumberSigns.isValid(sign)){
      console.warn(`[@spices/basil.i18n.number] Invalid sign: ${sign}. Fallback to default value`)
      sign = NumberSigns.AUTO
    }
    
    // Style validation
    if (!NumberStyles.isValid(style) || style === NumberStyles.CURRENCY){
      console.warn(`[@spices/basil.i18n.number] Invalid style: ${style} for the number formatter. Fallback to default value`)
      style = NumberStyles.DECIMAL
    }
    
    // Display validation
    display = basil.isNil(display) ? Formats.SHORT : display
    if (![Formats.LONG, Formats.SHORT, Formats.NARROW].includes(display)){
      console.warn(`[@spices/basil.i18n.number] Invalid display: ${display} for the number formatter. Fallback to default value`)
      display = Formats.SHORT
    }

    // Unit validation
    // For a custom unit, set the unit to liter and replace the symbol by the custom one
    if (!NumberUnits.isValid(unit) && isStyleUnit){
      unit = NumberUnits.LITER
    }

    // Validate the locale. If unvalid, fallback to the basil.i18n.locale value
    if (!locale || basil.isNil(locale)) {
      locale = scope.locale
    }

    let o = {
      notation: compact === true ? 'compact' : 'standard',
      signDisplay: sign,
      style: style,
      useGrouping: group
    }
    
    if (isStyleUnit){ o.unit = unit }
    if (isStyleUnit && display){ o.unitDisplay = display }
    if (fraction){ o.maximumFractionDigits = Math.min(20, Math.max(fraction, 0)) }
    if (significant){ o.maximumSignificantDigits = Math.min(21, Math.max(significant, 1)) }

    if (basil.isObject(locale)) {
      locale = locale.toString()
    }
    
    // console.group('number');
    // console.log(`locale: ${locale}`)
    // console.log(`o: ${JSON.stringify(o)}`);
    // console.log(`value: ${value}`);
    // console.groupEnd('number');
    let ret = new Intl.NumberFormat(locale, o).format(value)
    
    // Unit validation
    // For a custom unit, set the unit to liter and replace the symbol by the custom one
    if (isStyleUnit && requestedUnit !== unit) {
      ret = ret.replace('L', requestedUnit)
    }

    return ret
  }

  const percent = (value, options = {}) => {
    options.style = NumberStyles.PERCENT
    return number(value, options)
  }

  const unit = (value, options = {}) => {
    options.style = NumberStyles.UNIT
    return number(value, options)
  }

  scope.number = number
  scope.percent = percent
  scope.unit = unit
}