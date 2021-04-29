const { basil } = require('@spices/basil')
const { install } = require('../dist/spices-basil-i18n')

basil.use(install)
global.basil = basil

module.exports = {
  basil  
}