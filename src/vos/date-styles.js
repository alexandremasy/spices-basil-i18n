import DateFormats from './date-formats'

class $DateStyle {
  constructor({ day, era, formatter, hour, minute, month, name, second, timezone, weekday, year }){
    this.day = day || DateFormats.NONE
    this.era = era || DateFormats.NONE
    this.formatter = formatter ? formatter : (value) => value 
    this.hour = hour || DateFormats.NONE
    this.minute = minute || DateFormats.NONE
    this.month = month || DateFormats.NONE
    this.name = name
    this.second = second || DateFormats.NONE
    this.timezone = timezone || DateFormats.NONE
    this.weekday = weekday || DateFormats.NONE
    this.year = year || DateFormats.NONE
  }
}

const DateStyles = {}

DateStyles.DATE = new $DateStyle({ name: 'date', year: DateFormats.NUMERIC, month: DateFormats.DIGIT2, day: DateFormats.DIGIT2 })
DateStyles.DATETIME = new $DateStyle({ name: 'datetime', year: DateFormats.NUMERIC, month: DateFormats.DIGIT2, day: DateFormats.DIGIT2, hour: DateFormats.DIGIT2, minute: DateFormats.DIGIT2 })
DateStyles.MONTH = new $DateStyle({ name: 'month', month: DateFormats.SHORT })
DateStyles.TIME = new $DateStyle({ name: 'time', hour: DateFormats.DIGIT2, minute: DateFormats.DIGIT2 })
DateStyles.WEEKDAY = new $DateStyle({ name: 'weekday', weekday: DateFormats.SHORT })

DateStyles.ALL = [
  DateStyles.DATE,
  DateStyles.DATETIME,
  DateStyles.TIME,
  DateStyles.WEEKDAY,
]

DateStyles.isValid = (value) => DateStyles.ALL.includes(value)
DateStyles.$class = $DateStyle

export default DateStyles