let tests = [
  { in: 1,                   out: '€1.00', options: {}},
  { in: 123456789.123456789, out: '€123,456,789.12', options: {}},
  { in: 123456789.123456789, out: '123 456 789,12 €', options: { locale: 'fr' }},
  { in: 123456789.123456789, out: '€123.46M', options: { compact: true }},
  { in: 123456789.123456789, out: '€123,456,789.123', options: { fraction: 3 }},
  { in: 123456789.123456789, out: '€123456789.123', options: { fraction: 3, group: false }},
]

// @todo test for the locale global value.
//  -> if the value is set use it
//  -> if the value is set and the arg also, use the arg
//  -> if the value is not set and the arg is set, use the arg
//  -> if the value is not set and the arg not set, use fallback
//  -> if the value, args and fallback are not set, use 'en'


describe('currency', () => {

  afterEach(() => {
    basil.i18n.ctrl.reset()
  })
  
  tests.forEach(t => {
    let opts = Object.keys(t.options).map(o => {
      return `${o}: ${t.options[o]}`
    })

    it(`${t.in} => ${t.out} [${opts}]`, () => {
      expect(basil.i18n.currency(t.in, t.options)).toBe(t.out);
    })
  })
})