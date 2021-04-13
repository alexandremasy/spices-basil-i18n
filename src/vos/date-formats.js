const DateFormats = {}

DateFormats.NONE = 'none';
DateFormats.LONG = 'long'
DateFormats.SHORT = 'short'
DateFormats.NARROW = 'narrow'
DateFormats.NUMERIC = 'numeric'
DateFormats.DIGIT2 = '2-digit'

DateFormats.ALL = [
  DateFormats.NONE,
  DateFormats.LONG,
  DateFormats.SHORT,
  DateFormats.NARROW,
  DateFormats.NUMERIC,
  DateFormats.DIGIT2
]

DateFormats.isValid = (value) => DateFormats.ALL.includes(value)

export default DateFormats