const NumberUnits = {}
NumberUnits.ACRE = 'acre'
NumberUnits.BIT = 'bit'
NumberUnits.BYTE = 'byte'
NumberUnits.CELSIUS = 'celsius'
NumberUnits.CENTIMETER = 'centimeter'
NumberUnits.DAY = 'day'
NumberUnits.DEGREE = 'degree'
NumberUnits.FAHRENHEIT = 'fahrenheit'
NumberUnits.FLUID_OUNCE = 'fluid-ounce'
NumberUnits.FOOT = 'foot'
NumberUnits.GALLON = 'gallon'
NumberUnits.GIGABIT = 'gigabit'
NumberUnits.GIGABYTE = 'gigabyte'
NumberUnits.GRAM = 'gram'
NumberUnits.HECTARE = 'hectare'
NumberUnits.HOUR = 'hour'
NumberUnits.INCH = 'inch'
NumberUnits.KILOBIT = 'kilobit'
NumberUnits.KILOBYTE = 'kilobyte'
NumberUnits.KILOGRAM = 'kilogram'
NumberUnits.KILOMETER = 'kilometer'
NumberUnits.LITER = 'liter'
NumberUnits.MEGABIT = 'megabit'
NumberUnits.MEGABYTE = 'megabyte'
NumberUnits.METER = 'meter'
NumberUnits.MILE = 'mile'
NumberUnits.MILE_SCANDINAVIAN = 'mile-scandinavian'
NumberUnits.MILLILITER = 'milliliter'
NumberUnits.MILLIMETER = 'millimeter'
NumberUnits.MILLISECOND = 'millisecond'
NumberUnits.MINUTE = 'minute'
NumberUnits.MONTH = 'month'
NumberUnits.OUNCE = 'ounce'
NumberUnits.PERCENT = 'percent'
NumberUnits.PETABYTE = 'petabyte'
NumberUnits.POUND = 'pound'
NumberUnits.SECOND = 'second'
NumberUnits.STONE = 'stone'
NumberUnits.TERABIT = 'terabit'
NumberUnits.TERABYTE = 'terabyte'
NumberUnits.WEEK = 'week'
NumberUnits.YARD = 'yard'
NumberUnits.YEAR = 'year'

NumberUnits.ALL = [
  NumberUnits.ACRE,
  NumberUnits.BIT,
  NumberUnits.BYTE,
  NumberUnits.CELSIUS,
  NumberUnits.CENTIMETER,
  NumberUnits.DAY,
  NumberUnits.DEGREE,
  NumberUnits.FAHRENHEIT,
  NumberUnits.FLUID_OUNCE,
  NumberUnits.FOOT,
  NumberUnits.GALLON,
  NumberUnits.GIGABIT,
  NumberUnits.GIGABYTE,
  NumberUnits.GRAM,
  NumberUnits.HECTARE,
  NumberUnits.HOUR,
  NumberUnits.INCH,
  NumberUnits.KILOBIT,
  NumberUnits.KILOBYTE,
  NumberUnits.KILOGRAM,
  NumberUnits.KILOMETER,
  NumberUnits.LITER,
  NumberUnits.MEGABIT,
  NumberUnits.MEGABYTE,
  NumberUnits.METER,
  NumberUnits.MILE,
  NumberUnits.MILE_SCANDINAVIAN,
  NumberUnits.MILLILITER,
  NumberUnits.MILLIMETER,
  NumberUnits.MILLISECOND,
  NumberUnits.MINUTE,
  NumberUnits.MONTH,
  NumberUnits.OUNCE,
  NumberUnits.PERCENT,
  NumberUnits.PETABYTE,
  NumberUnits.POUND,
  NumberUnits.SECOND,
  NumberUnits.STONE,
  NumberUnits.TERABIT,
  NumberUnits.TERABYTE,
  NumberUnits.WEEK,
  NumberUnits.YARD,
  NumberUnits.YEAR,
]

NumberUnits.isValid = (value) => NumberUnits.ALL.includes(value)

export default NumberUnits