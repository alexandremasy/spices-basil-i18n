import Formats from './formats'

class $DateStyle {
  constructor({ day, era, formatter, hour, minute, month, name, second, timezone, weekday, year }){
    this.day = day || Formats.NONE
    this.era = era || Formats.NONE
    this.formatter = formatter ? formatter : (value) => value 
    this.hour = hour || Formats.NONE
    this.minute = minute || Formats.NONE
    this.month = month || Formats.NONE
    this.name = name
    this.second = second || Formats.NONE
    this.timezone = timezone || Formats.NONE
    this.weekday = weekday || Formats.NONE
    this.year = year || Formats.NONE
  }
}

const DateStyles = {}

DateStyles.DATE = new $DateStyle({ name: 'date', year: Formats.NUMERIC, month: Formats.DIGIT2, day: Formats.DIGIT2 })
DateStyles.DATETIME = new $DateStyle({ name: 'datetime', year: Formats.NUMERIC, month: Formats.DIGIT2, day: Formats.DIGIT2, hour: Formats.DIGIT2, minute: Formats.DIGIT2 })
DateStyles.MONTH = new $DateStyle({ name: 'month', month: Formats.SHORT })
DateStyles.TIME = new $DateStyle({ name: 'time', hour: Formats.DIGIT2, minute: Formats.DIGIT2 })
DateStyles.WEEKDAY = new $DateStyle({ name: 'weekday', weekday: Formats.SHORT })

DateStyles.ALL = [
  DateStyles.DATE,
  DateStyles.DATETIME,
  DateStyles.TIME,
  DateStyles.WEEKDAY,
]

DateStyles.isValid = (value) => DateStyles.ALL.includes(value)
DateStyles.$class = $DateStyle

export default DateStyles