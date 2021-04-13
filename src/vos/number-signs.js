const NumberSigns = {}

NumberSigns.AUTO = 'auto'
NumberSigns.NEVER = 'never'
NumberSigns.ALWAYS = 'always'
NumberSigns.EXCEPTZERO = 'exceptZero'

NumberSigns.ALL = [
  NumberSigns.AUTO,
  NumberSigns.NEVER,
  NumberSigns.ALWAYS,
  NumberSigns.EXCEPTZERO
]

NumberSigns.isValid = (value) => NumberSigns.ALL.includes(value)

export default NumberSigns