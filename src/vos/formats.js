const Formats = {}

Formats.CODE = 'code'
Formats.DIGIT2 = '2-digit'
Formats.LONG = 'long'
Formats.NAME = 'name'
Formats.NARROW = 'narrow'
Formats.NARROW_SYMBOL = 'narrowSymbol'
Formats.NONE = 'none';
Formats.NUMERIC = 'numeric'
Formats.SHORT = 'short'
Formats.SYMBOL = 'symbol'

Formats.ALL = [
  Formats.CODE,
  Formats.DIGIT2,
  Formats.LONG,
  Formats.NAME,
  Formats.NARROW,
  Formats.NARROW_SYMBOL,
  Formats.NONE,
  Formats.NUMERIC,
  Formats.SHORT,
  Formats.SYMBOL,
]

Formats.isValid = (value) => Formats.ALL.includes(value)

export default Formats