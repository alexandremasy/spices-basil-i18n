import Formats from '../vos/formats'
import DateStyles from '../vos/date-styles'

export default (basil, scope) => {

  const date = (value, options = {}) => {
    let { 
      day, 
      era, 
      hour, 
      locale = 'en', 
      minute, 
      month, 
      second, 
      style = DateStyles.DATE, 
      timezone, 
      weekday, 
      year 
    } = options

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
    let o = Object.assign({}, style)
    if (!basil.isNil(day)){ o.day = day }
    if (!basil.isNil(era)){ o.era = era }
    if (!basil.isNil(hour)){ o.hour = hour }
    if (!basil.isNil(minute)){ o.minute = minute }
    if (!basil.isNil(month)){ o.month = month }
    if (!basil.isNil(second)){ o.second = second }
    if (!basil.isNil(timezone)){ o.timeZoneName = timezone }
    if (!basil.isNil(weekday)){ o.weekday = weekday }
    if (!basil.isNil(year)){ o.year = year }
    o.hourCycle = 'h24'

    if (o.day == Formats.NONE){ delete o.day }
    if (o.era == Formats.NONE){ delete o.era }
    if (o.hour == Formats.NONE){ delete o.hour }
    if (o.minute == Formats.NONE){ delete o.minute }
    if (o.month == Formats.NONE){ delete o.month }
    if (o.second == Formats.NONE){ delete o.second }
    if (o.timeZoneName == Formats.NONE){ delete o.timeZoneName }
    if (o.weekday == Formats.NONE){ delete o.weekday }
    if (o.year == Formats.NONE){ delete o.year }

    // console.log(o)
    let ret = new Intl.DateTimeFormat(locale, o).format(value)
    ret = ret.replace(',', '')
    ret = ret.formatter ? ret.formatter(ret) : ret
    
    return ret
  }

  const datetime = (value, options) => {
    options.style = DateStyles.DATETIME
    return date(value, options)
  }

  const time = (value, options) => {
    options.style = DateStyles.TIME
    return date(value, options)
  }

  scope.date = date
  scope.datetime = datetime
  scope.time = time
}