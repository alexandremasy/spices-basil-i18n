describe.skip('locales', () => {
  
  /**
   * Make sure the default value is null
   */
  it(`default []`, () => {
    expect(basil.i18n.locales).toBe(null)
  })

  /**
   * Make sur setting locales works
   */
  it(`set as ['fr', 'en']`, () => {
    let value = [
      new basil.i18n.Locale('fr'),
      new basil.i18n.Locale('en'),
    ]
    basil.i18n.locales = value
    expect(basil.i18n.locales).toBe(value)
  })

  /**
   * Make sur all the entries are valid basil.i18n.Locale
   */
  it(`validation`, () => {
    let value = [
      new basil.i18n.Locale('fr'),
      null,
      'fr'
    ]
    expect(() => basil.i18n.locales = value).toThrow()
    expect(() => basil.i18n.locales = null).toThrow()
  })
})