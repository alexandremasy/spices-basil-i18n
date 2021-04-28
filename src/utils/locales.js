/**
 * @param {Basil} basil The basil intance
 * @param {Object} scope The basil scope (basil.i18n)
 * @param {Object} options The basil i18n options (basil.18n.options)
 * @param {i18nLocaleController} ctrl The i18n locale controller
 */
export default (basil, scope, options, ctrl) => {
  Object.defineProperty(scope, 'locales', {
    enumerable: true,
    get: () => ctrl.locales,
    set: (value) => ctrl.locales = value    
  })
}
