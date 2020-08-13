let _locales = [];

export default (basil) => {
  Object.defineProperty(basil, 'locales', {
    get: () => _locale,
    set: (value) => {
      _locale = value;
    }
  })
}
