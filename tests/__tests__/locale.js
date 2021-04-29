describe('currency', () => {

  afterEach(() => {
    basil.i18n.ctrl.reset()
  });

  /**
   * Make sure the default locale is en-GB
   */
  it(`default locale en-GB`, () => {
    expect(basil.i18n.locale.toString()).toBe('en-US')
  })

  /**
   * Make sure settings a locale with no validation works
   */
  it(`set fr`, () => {
    basil.i18n.locale = 'fr'
    expect(basil.i18n.locale.toString()).toBe('fr')
  })

  /**
   * Make sure the null validation works
   */
  it(`set null`, () => {
    expect(() => basil.i18n.locale = null).toThrow()
  })

})