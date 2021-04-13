import DateFormats from './date-formats'

class $DateComponents{
  constructor(formats){
    this.$id = Symbol()
    this.formats = formats
  }
}

const DateComponents = {}

DateComponents.DAY = new $DateComponents([DateFormats.NONE, DateFormats.NUMERIC, DateFormats.DIGIT2])
DateComponents.ERA = new $DateComponents([DateFormats.NONE, DateFormats.LONG, DateFormats.SHORT, DateFormats.NARROW])
DateComponents.HOUR = new $DateComponents([DateFormats.NONE, DateFormats.NUMERIC, DateFormats.DIGIT2])
DateComponents.MINUTE = new $DateComponents([DateFormats.NONE, DateFormats.NUMERIC, DateFormats.DIGIT2])
DateComponents.MONTH = new $DateComponents([DateFormats.NONE, DateFormats.NUMERIC, DateFormats.DIGIT2, DateFormats.LONG, DateFormats.SHORT, DateFormats.NARROW])
DateComponents.SECOND = new $DateComponents([DateFormats.NONE, DateFormats.NUMERIC, DateFormats.DIGIT2])
DateComponents.TIMEZONE = new $DateComponents([DateFormats.NONE, DateFormats.LONG, DateFormats.SHORT])
DateComponents.WEEKDAY = new $DateComponents([DateFormats.NONE, DateFormats.LONG, DateFormats.SHORT, DateFormats.NARROW])
DateComponents.YEAR = new $DateComponents([DateFormats.NONE, DateFormats.NUMERIC, DateFormats.DIGIT2])

DateComponents.ALL = [
  DateComponents.WEEKDAY,
  DateComponents.ERA,
  DateComponents.YEAR,
  DateComponents.MONTH,
  DateComponents.DAY,
  DateComponents.HOUR,
  DateComponents.MINUTE,
  DateComponents.SECOND,
  DateComponents.TIMEZONE
]

export default DateComponents