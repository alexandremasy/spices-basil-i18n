export default (value) => {
  let ten = function (i) {
      return (i < 10 ? '0' : '') + i;
  }
  let YYYY = value.getFullYear()
  let MM = ten(value.getMonth() + 1)
  let DD = ten(value.getDate())
  let HH = ten(value.getHours())
  let II = ten(value.getMinutes())
  let SS = ten(value.getSeconds())

  return `${YYYY}-${MM}-${DD}T${HH}:${II}:${SS}`
}