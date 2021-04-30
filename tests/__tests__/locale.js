describe('locale', () => {

  // afterEach(() => {
  //   basil.i18n.ctrl.reset()
  // });

  /**
   * Make sure the default locale is en-GB
   * Note: Using en-US as in the node v8 env the navigator.language returns en-US
   */
  it(`default locale en-GB`, () => {
    expect(basil.i18n.locale.toString()).toBe('en-GB')
  })

  /**
   * Make sure settings a locale with no validation works
   * Make sure it accept String and basil.i18n.Locale
   */
  it(`set fr`, () => {
    basil.i18n.locale = 'fr'
    expect(basil.i18n.locale.toString()).toBe('fr')
    
    basil.i18n.ctrl.reset()
    basil.i18n.locale = new basil.i18n.Locale('fr')
    expect(basil.i18n.locale.toString()).toBe('fr')
  })

  /**
   * Make sure the null validation works
   */
  it(`set null`, () => {
    expect(() => basil.i18n.locale = null).toThrow()
  })

  /**
   * Make sure the basic group validation works
   */
  it.skip(`set 'de' in group ['en', 'fr', 'nl']`, () => {
    basil.i18n.locales = [
      new basil.i18n.Locale('en'),
      new basil.i18n.Locale('fr'),
      new basil.i18n.Locale('nl'),
    ]

    basil.i18n.locale = 'en'
    expect(basil.i18n.locale.toString()).toBe('en')

    // expect(() => basil.i18n.locale = 'de').toThrow()
  })
})