import DateComponents from '../vos/date-components'
import DateFormats from '../vos/date-formats'
import DateStyles from '../vos/date-styles'

export default (basil) => {

  const date = ({ day, era, hour, locale = 'en', minute, month, second, style, timezone, value, weekday, year}) => {
    // Validate the value is a date
    if (!basil.isDate(value)){
      console.error(`@spices/basil: Invalid value for the date formatter. Must be a date. ${value}`)
      return
    }

    let isValid = DateStyles.isValid(style)
    if (!basil.isNil(style) && !isValid){
      console.warn(`@spices/basil: Invalid style for the date formatter. Fallback to a default value. ${style}`)
    }  

    // Allow the override of a defined style
    let options = Object.assign({}, style)
    if (!basil.isNil(day)){ options.day = day }
    if (!basil.isNil(era)){ options.era = era }
    if (!basil.isNil(hour)){ options.hour = hour }
    if (!basil.isNil(minute)){ options.minute = minute }
    if (!basil.isNil(month)){ options.month = month }
    if (!basil.isNil(second)){ options.second = second }
    if (!basil.isNil(timezone)){ options.timezone = timezone }
    if (!basil.isNil(weekday)){ options.weekday = weekday }
    if (!basil.isNil(year)){ options.year = year }
    options.hourCycle = 'h24'

    if (options.day == DateFormats.NONE){ delete options.day }
    if (options.era == DateFormats.NONE){ delete options.era }
    if (options.hour == DateFormats.NONE){ delete options.hour }
    if (options.minute == DateFormats.NONE){ delete options.minute }
    if (options.month == DateFormats.NONE){ delete options.month }
    if (options.second == DateFormats.NONE){ delete options.second }
    if (options.timezone == DateFormats.NONE){ delete options.timezone }
    if (options.weekday == DateFormats.NONE){ delete options.weekday }
    if (options.year == DateFormats.NONE){ delete options.year }

    let ret = new Intl.DateTimeFormat(locale, options).format(value)
    ret = ret.replace(',', '')
    ret = ret.formatter ? ret.formatter(ret) : ret
    
    return ret
  }

  basil.date = date
  basil.DateComponents = DateComponents
  basil.DateFormats = DateFormats
  basil.DateStyles = DateStyles
}