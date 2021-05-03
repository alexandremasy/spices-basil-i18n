export default {
  name: 'i18n-unit',
  functional: true,
  props: {
    compact: {
      type: Boolean,
    },

    display: {
      type: String
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

    unit: {
      type: String
    },

    value: {
      type: Number,
      required: true
    },
  },

  render(h, { props, parent, data }) {
    let locale = props.locale || parent.$basil.i18n.locale
    let tag = (!!props.tag && props.tag !== true) || props.tag === false ? props.tag : 'span'
    let value = parent.$basil.i18n.number(props.value, {
      compact: props.compact,
      display: props.display,
      fraction: props.fraction,
      group: props.group,
      locale,
      sign: props.sign,
      significant: props.significant,
      style: parent.$basil.i18n.NumberStyles.UNIT,
      unit: props.unit
    })

    return tag ?
      h(tag, {
        attrs: data.attrs,
        'class': data['class'],
        staticClass: data.staticClass
      }, value) : value
  }
}