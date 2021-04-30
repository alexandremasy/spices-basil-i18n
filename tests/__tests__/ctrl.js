describe('i18ncontroller', () => {
  let en = new basil.i18n.Locale('en')
  let fr = new basil.i18n.Locale('fr')
  let frBE = new basil.i18n.Locale('fr_BE')
  let frFR = new basil.i18n.Locale('fr_FR')
  let deBE = new basil.i18n.Locale('de_BE')
  let enBE = new basil.i18n.Locale('en_BE')
  let enGB = new basil.i18n.Locale('en_GB')
  let nlBE = new basil.i18n.Locale('nl_BE')

  afterEach(() => {
    basil.i18n.ctrl.reset()
  })

  /**
   * Country
   */
  it(`country: [en, fr_BE, de_BE] + fr_BE => [fr_BE, de_BE]`, () => {
    let locales = [en, frBE, deBE]
    let value = frBE
    let expected = [frBE, deBE]
    expect(basil.i18n.ctrl.getMatchingCountry(value, locales)).toEqual(expect.arrayContaining(expected))
  })

  it(`country: [en, fr_BE, de_BE] + fr => [en, fr_BE, de_BE]`, () => {
    let locales = [en, frBE, deBE]
    let value = fr
    let expected = [en, frBE, deBE]
    expect(basil.i18n.ctrl.getMatchingCountry(value, locales)).toEqual(expect.arrayContaining(expected))
  })

  it(`country: [en, fr_BE, de_BE] + en_BE => [fr_BE, de_BE]`, () => {
    let locales = [en, frBE, deBE]
    let value = enBE
    let expected = [frBE, deBE]
    expect(basil.i18n.ctrl.getMatchingCountry(value, locales)).toEqual(expect.arrayContaining(expected))
  })

  it(`country: [en, fr_BE, de_BE] + en_GB => []`, () => {
    let locales = [en, frBE, deBE]
    let value = enGB
    let expected = []
    expect(basil.i18n.ctrl.getMatchingCountry(value, locales)).toEqual(expect.arrayContaining(expected))
  })
  
  /**
   * Locale
   */
  it(`locale: [en, fr_BE, de_BE] + fr_BE => [fr_BE]`, () => {
    let locales = [en, frBE, deBE]
    let value = frBE
    let expected = [frBE]
    expect(basil.i18n.ctrl.getMatchingLocale(value, locales)).toEqual(expect.arrayContaining(expected))
  })
  
  it(`locale: [en, fr_BE, fr_FR, de_BE] + fr => [fr_BE, fr_FR]`, () => {
    let locales = [en, frBE, frFR, deBE]
    let value = fr
    let expected = [frBE, frFR]
    expect(basil.i18n.ctrl.getMatchingLocale(value, locales)).toEqual(expect.arrayContaining(expected))
  })
  
  it(`locale: [en, fr_BE, de_BE] + en_BE => [en]`, () => {
    let locales = [en, frBE, deBE]
    let value = enBE
    let expected = [en]
    expect(basil.i18n.ctrl.getMatchingLocale(value, locales)).toEqual(expect.arrayContaining(expected))
  })
  
  it(`locale: [en, fr_BE, de_BE] + nl_BE => []`, () => {
    let locales = [en, frBE, deBE]
    let value = nlBE
    let expected = []
    expect(basil.i18n.ctrl.getMatchingLocale(value, locales)).toEqual(expect.arrayContaining(expected))
  })

  /**
   * Evaluation
   */
  it(``, () => {

  })
})