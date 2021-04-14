import Formats from './formats'

class $DateComponents{
  constructor(formats){
    this.$id = Symbol()
    this.formats = formats
  }
}

const DateComponents = {}

DateComponents.DAY = new $DateComponents([Formats.NONE, Formats.NUMERIC, Formats.DIGIT2])
DateComponents.ERA = new $DateComponents([Formats.NONE, Formats.LONG, Formats.SHORT, Formats.NARROW])
DateComponents.HOUR = new $DateComponents([Formats.NONE, Formats.NUMERIC, Formats.DIGIT2])
DateComponents.MINUTE = new $DateComponents([Formats.NONE, Formats.NUMERIC, Formats.DIGIT2])
DateComponents.MONTH = new $DateComponents([Formats.NONE, Formats.NUMERIC, Formats.DIGIT2, Formats.LONG, Formats.SHORT, Formats.NARROW])
DateComponents.SECOND = new $DateComponents([Formats.NONE, Formats.NUMERIC, Formats.DIGIT2])
DateComponents.TIMEZONE = new $DateComponents([Formats.NONE, Formats.LONG, Formats.SHORT])
DateComponents.WEEKDAY = new $DateComponents([Formats.NONE, Formats.LONG, Formats.SHORT, Formats.NARROW])
DateComponents.YEAR = new $DateComponents([Formats.NONE, Formats.NUMERIC, Formats.DIGIT2])

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