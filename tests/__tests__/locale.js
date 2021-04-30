describe('locale', () => {
  let fr = new basil.i18n.Locale('fr')
  let frBE = new basil.i18n.Locale('fr_BE')
  let frFR = new basil.i18n.Locale('fr_FR')
  
  let en = new basil.i18n.Locale('en')
  let enBE = new basil.i18n.Locale('en_BE')
  let enGB = new basil.i18n.Locale('en_GB')

  let de = new basil.i18n.Locale('de')
  let deBE = new basil.i18n.Locale('de_BE')

  let nl = new basil.i18n.Locale('nl')
  let nlBE = new basil.i18n.Locale('nl_BE')

  afterEach(() => {
    basil.i18n.ctrl.reset()
  })

  /**
   * Make sure the default locale is en-GB
   * Note: Using en-US as in the node v8 env the navigator.language returns en-US
   */
  it(`default locale en-GB`, () => {
    expect(basil.i18n.locale.toString()).toBe(enGB.toString())
  })

  /**
   * Make sure settings a locale with no validation works
   * Make sure it accept String and basil.i18n.Locale
   */
  it(`set fr`, () => {
    basil.i18n.locale = fr
    expect(basil.i18n.locale).toBe(fr)
    
    basil.i18n.ctrl.reset()
    basil.i18n.locale = fr.toString()
    expect(basil.i18n.locale.toString()).toBe(fr.toString())
  })

  /**
   * Make sure the null validation works
   */
  it(`set null`, () => {
    expect(() => basil.i18n.locale = null).toThrow()
  })

  ///////////////////////////////////////////////////////////////////////////////////
  // 
  // Matching process
  // 
  ///////////////////////////////////////////////////////////////////////////////////

  it.only(`[en, fr, nl] + fr => [fr, nl] => fr`, () => {
    basil.i18n.locales = [en, fr, nl]
    basil.i18n.locale = fr

    basil.i18n.locales = [fr, nl]
    expect(basil.i18n.locale).toBe(fr)
  })
  
  it.only(`[en, fr, nl] + fr => [en, nl] => en`, () => {
    basil.i18n.locales = [en, fr, nl]
    basil.i18n.locale = fr

    basil.i18n.locales = [en, nl]
    expect(basil.i18n.locale).toBe(en)
  })
  
  it.only(`[en, fr, nl] + fr => [en, fr_FR, nl] => fr_FR`, () => {
    basil.i18n.locales = [en, fr, nl]
    basil.i18n.locale = fr

    basil.i18n.locales = [en, frFR, nl]
    expect(basil.i18n.locale).toBe(frFR)
  })

  it.only(`[en, fr, nl] + fr => [en, de, nl] => en`, () => {
    basil.i18n.locales = [en, fr, nl]
    basil.i18n.locale = fr

    basil.i18n.locales = [en, de, nl]
    expect(basil.i18n.locale).toBe(en)
  })
})