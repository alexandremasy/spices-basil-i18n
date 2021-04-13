const NumberStyles = {}
NumberStyles.CURRENCY = 'currency'
NumberStyles.DECIMAL = 'decimal'
NumberStyles.PERCENT = 'percent'
NumberStyles.UNIT = 'unit'

NumberStyles.ALL = [
  NumberStyles.CURRENCY,
  NumberStyles.DECIMAL,
  NumberStyles.PERCENT,
  NumberStyles.UNIT
]

NumberStyles.isValid = (value) => NumberStyles.ALL.includes(value)

export default NumberStyles