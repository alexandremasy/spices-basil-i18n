export default {
  name: 'i18n-currency',
  functional: true,
  props: {
    compact: {
      type: Boolean,
    },

    currency: {
      type: String
    },

    display: {
      type: String
    },

    fraction: {
      type: Number
    },

    group: {
      type: Boolean
    },

    locale: {
      type: String
    },

    sign: {
      type: String
    },

    significant: {
      type: Number
    },

    tag: {
      type: [String, Boolean, Object],
      default: 'span'
    },

    value: {
      type: Number,
      required: true
    },
  },

  render(h, { props, parent, data }) {
    let locale = props.locale || parent.$basil.i18n.locale
    let tag = (!!props.tag && props.tag !== true) || props.tag === false ? props.tag : 'span'
    let value = parent.$basil.i18n.currency(props.value, {
      compact: props.compact,
      currency: props.currency,
      display: props.display,
      fraction: props.fraction,
      group: props.group,
      locale,
      sign: props.sign,
      significant: props.significant
    })

    return tag ?
      h(tag, {
        attrs: data.attrs,
        'class': data['class'],
        staticClass: data.staticClass
      }, value) : value
  }
}