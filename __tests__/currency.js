const { basil } = require('@spices/basil')
const { install } = require('../dist/spices-basil-i18n')

beforeAll(() => {
  basil.use(install)
})

describe('currency', () => {
  it('1 -> €1.00', () => {
    expect(basil.i18n.currency(1)).toBe('€1.00');
  });
  
  it('123.456 -> €123.46', () =>{
    expect(basil.i18n.currency(123.456)).toBe('€123.46');
  })

  it('123.456 (fr) -> 123,46 €', () =>{
    expect(basil.i18n.currency(123.456, { locale: 'fr' })).toBe('123,46 €');
  })
})