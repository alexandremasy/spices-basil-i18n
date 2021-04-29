let tests = [
  { in: 1,                   out: '€1.00', options: {}},
  { in: 123456789.123456789, out: '€123,456,789.12', options: {}},
  { in: 123456789.123456789, out: '123 456 789,12 €', options: { locale: 'fr' }},
  { in: 123456789.123456789, out: '€123.46M', options: { compact: true }},
  { in: 123456789.123456789, out: '€123,456,789.123', options: { fraction: 3 }},
  { in: 123456789.123456789, out: '€123456789.123', options: { fraction: 3, group: false }},
]

describe('currency', () => {
  tests.forEach(t => {
    let opts = Object.keys(t.options).map(o => {
      return `${o}: ${t.options[o]}`
    })

    it(`${t.in} => ${t.out} [${opts}]`, () => {
      expect(basil.i18n.currency(t.in, t.options)).toBe(t.out);
    })
  })
})