import Formats from '../vos/formats'
import DateStyles from '../vos/date-styles'

export default (basil, scope) => {

  const date = ({ day, era, hour, locale = 'en', minute, month, second, style = DateStyles.DATE, timezone, value, weekday, year}) => {
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

    if (options.day == Formats.NONE){ delete options.day }
    if (options.era == Formats.NONE){ delete options.era }
    if (options.hour == Formats.NONE){ delete options.hour }
    if (options.minute == Formats.NONE){ delete options.minute }
    if (options.month == Formats.NONE){ delete options.month }
    if (options.second == Formats.NONE){ delete options.second }
    if (options.timezone == Formats.NONE){ delete options.timezone }
    if (options.weekday == Formats.NONE){ delete options.weekday }
    if (options.year == Formats.NONE){ delete options.year }

    let ret = new Intl.DateTimeFormat(locale, options).format(value)
    ret = ret.replace(',', '')
    ret = ret.formatter ? ret.formatter(ret) : ret
    
    return ret
  }

  const datetime = (options) => {
    options.style = DateStyles.DATETIME
    return date(options)
  }

  const time = (options) => {
    options.style = DateStyles.TIME
    return date(options)
  }

  scope.date = date
  scope.datetime = datetime
  scope.time = time
}