const Priority = {}

Priority.COUNTRY = 'country'
Priority.LOCALE = 'locale'

Priority.ALL = [
  Priority.COUNTRY,
  Priority.LOCALE
]

Priority.isValid = (value) => Priority.ALL.includes(value)

export default Priority